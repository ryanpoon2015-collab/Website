# Robust 7-segment single-digit parser (auto-fits the strips to YOUR crop).
# Fixes “everything looks like 8” by: (1) deskewing, (2) tight ink bbox,
# (3) narrow centerline strips per segment, (4) local adaptive threshold,
# (5) fuzzy match if not exact.

import cv2, numpy as np
from math import cos, sin, radians

# bit order: [a,b,c,d,e,f,g]
DIGITS = {
    0: 0b1111110,
    1: 0b0110000,
    2: 0b1101101,
    3: 0b1111001,
    4: 0b0110011,
    5: 0b1011011,
    6: 0b1011111,
    7: 0b1110000,
    8: 0b1111111,
    9: 0b1111011,
}
MINUS = 0b0000001


def _to_gray(img):
    if img.ndim == 3:
        return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img


def _auto_binarize(gray):
    # Try both polarities with adaptive threshold; keep one with sparser ink.
    g = cv2.medianBlur(gray, 3)
    th1 = cv2.adaptiveThreshold(
        g, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 5
    )
    th2 = cv2.bitwise_not(th1)
    # Prefer variant where “on” segments are white and background mostly black.
    return th2 if (th2 == 255).mean() < (th1 == 255).mean() else th1


def _deskew(bin_img):
    # MinAreaRect on foreground to estimate skew; rotate to make upright.
    ys, xs = np.where(bin_img == 255)
    if len(xs) < 20:
        return bin_img
    pts = np.column_stack([xs, ys]).astype(np.int32)
    rect = cv2.minAreaRect(pts)
    angle = rect[2]
    # OpenCV angle is in [-90,0); convert to small rotation
    if angle < -45:
        angle += 90
    if abs(angle) < 0.5:  # almost upright
        return bin_img
    (h, w) = bin_img.shape[:2]
    M = cv2.getRotationMatrix2D((w / 2, h / 2), angle, 1.0)
    rotated = cv2.warpAffine(bin_img, M, (w, h), flags=cv2.INTER_NEAREST, borderValue=0)
    return rotated


def _tight_bbox(bin_img, pad=2):
    ys, xs = np.where(bin_img == 255)
    if len(xs) == 0:
        return bin_img
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, bin_img.shape[1] - 1)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, bin_img.shape[0] - 1)
    return bin_img[y0 : y1 + 1, x0 : x1 + 1]


def _resize(bin_img, target_h=200):
    h, w = bin_img.shape
    if h < target_h:
        scale = target_h / h
        bin_img = cv2.resize(
            bin_img, (int(w * scale), target_h), interpolation=cv2.INTER_NEAREST
        )
    return bin_img


def _segment_on_ratios(bin_img):
    """
    Measure each segment using NARROW centerline strips → avoids ‘8’ bias.
    Returns a dict with ratios 0..1 per segment name.
    """
    h, w = bin_img.shape
    # Work within a central box to ignore DP/colon (trim 8% on both sides)
    mx = int(w * 0.08)
    my = int(h * 0.06)
    roi = bin_img[my : h - my, mx : w - mx]
    H, W = roi.shape

    # Thickness of sampling strips (very thin, to sample stroke centers)
    th_h = max(2, H // 28)  # horizontal strip thickness
    th_v = max(2, W // 18)  # vertical strip thickness

    # Y positions for a,g,d (top, middle, bottom)
    y_a = int(H * 0.10)
    y_g = int(H * 0.50)
    y_d = int(H * 0.88)

    # X positions for left/right verticals
    x_left = int(W * 0.12)
    x_right = int(W * 0.88)

    # Split verticals into upper/lower halves
    y_mid_up = int(H * 0.36)
    y_mid_lo = int(H * 0.64)

    def h_strip(yc, x0, x1):
        y0 = max(0, yc - th_h // 2)
        y1 = min(H, yc + (th_h - th_h // 2))
        x0 = max(0, x0)
        x1 = min(W, x1)
        s = roi[y0:y1, x0:x1]
        return (s == 255).mean() if s.size else 0.0

    def v_strip(xc, y0, y1):
        x0 = max(0, xc - th_v // 2)
        x1 = min(W, xc + (th_v - th_v // 2))
        y0 = max(0, y0)
        y1 = min(H, y1)
        s = roi[y0:y1, x0:x1]
        return (s == 255).mean() if s.size else 0.0

    # Measure
    a = h_strip(y_a, int(W * 0.15), int(W * 0.85))
    g = h_strip(y_g, int(W * 0.15), int(W * 0.85))
    d = h_strip(y_d, int(W * 0.15), int(W * 0.85))

    f = v_strip(x_left, int(H * 0.12), y_mid_up)
    b = v_strip(x_right, int(H * 0.12), y_mid_up)
    e = v_strip(x_left, y_mid_lo, int(H * 0.94))
    c = v_strip(x_right, y_mid_lo, int(H * 0.94))

    return {"a": a, "b": b, "c": c, "d": d, "e": e, "f": f, "g": g}


def _ratios_to_mask(r, thr=0.33):
    # Dynamic per-image threshold: pull slightly towards median to handle glare
    vals = np.array(list(r.values()))
    t = max(thr, float(np.median(vals) * 0.85))
    bits = [
        1 if r["a"] > t else 0,
        1 if r["b"] > t else 0,
        1 if r["c"] > t else 0,
        1 if r["d"] > t else 0,
        1 if r["e"] > t else 0,
        1 if r["f"] > t else 0,
        1 if r["g"] > t else 0,
    ]
    mask = 0
    for i, b in enumerate(bits[::-1]):  # g as LSB
        mask |= b << i
    return mask, t


def _best_digit(mask):
    # Exact match
    for d, m in DIGITS.items():
        if mask == m:
            return str(d), 1.0
    if mask == MINUS:
        return "-", 1.0

    # Fuzzy: Jaccard on bits
    def score(a, b):
        inter = bin(a & b).count("1")
        union = bin(a | b).count("1")
        return inter / max(1, union)

    best = max([(d, score(mask, m)) for d, m in DIGITS.items()], key=lambda x: x[1])
    return str(best[0]), float(best[1])


def read_7seg_digit(img):
    gray = _to_gray(img)
    bin1 = _auto_binarize(gray)
    bin2 = cv2.bitwise_not(bin1)  # try both; pick better confidence

    bets = []
    for candidate in (bin1, bin2):
        sk = _deskew(candidate)
        tb = _tight_bbox(sk, pad=2)
        rz = _resize(tb, target_h=220)
        ratios = _segment_on_ratios(rz)
        mask, thr_used = _ratios_to_mask(ratios, thr=0.30)
        d, conf = _best_digit(mask)
        # confidence boosted when strips are bimodal (clear on/off separation)
        vals = np.array(list(ratios.values()))
        sep = float(np.abs(vals - vals.mean()).mean())
        conf = min(1.0, conf + sep * 0.6)
        bets.append((d, conf, mask, thr_used, ratios))
    # choose better variant
    bets.sort(key=lambda x: x[1], reverse=True)
    d, conf, mask, thr_used, ratios = bets[0]
    return d, conf, mask, thr_used, ratios


# -------------- example --------------
if __name__ == "__main__":
    img = cv2.imread(rf"C:\Users\ACER\Desktop\5a.png")
    d, conf, mask, thr, ratios = read_7seg_digit(img)
    print(f"digit={d}, conf={conf:.2f}, mask={mask:07b}, thr={thr:.2f}")
    print("ratios:", {k: round(v, 3) for k, v in ratios.items()})
