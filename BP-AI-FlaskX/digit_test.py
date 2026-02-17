# Fast, offline, and very reliable for single 7-segment digits.
# Input: cropped image of ONE digit (any grayscale/BGR). Output: '0'..'9' or '?'.
import cv2, numpy as np

SEG_MAP = {
    0b1110111: "0",
    0b0100100: "1",
    0b1011101: "2",
    0b1101101: "3",
    0b0101110: "4",
    0b1101011: "5",
    0b1111011: "6",
    0b0100101: "7",
    0b1111111: "8",
    0b1101111: "9",
}
# segment order: A(top), B(top-right), C(bottom-right), D(bottom),
#                E(bottom-left), F(top-left), G(middle)


def _binarize(img):
    if len(img.shape) == 3:
        g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        g = img.copy()
    g = cv2.GaussianBlur(g, (3, 3), 0)
    # Otsu both polarities; keep one with more foreground in center
    _, t1 = cv2.threshold(g, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    _, t2 = cv2.threshold(g, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    h, w = g.shape
    cy, cx = h // 2, w // 2
    win = t1[cy - h // 6 : cy + h // 6, cx - w // 6 : cx + w // 6]
    if cv2.countNonZero(win) < (win.size // 2):
        binimg = t2  # choose the one with “ink” in the center
    else:
        binimg = t1
    # clean and normalize size
    binimg = cv2.morphologyEx(
        binimg, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8), iterations=1
    )
    # tight crop to the bounding box
    ys, xs = np.where(binimg > 0)
    if ys.size == 0:
        return cv2.resize(binimg, (100, 160), interpolation=cv2.INTER_NEAREST)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    cropped = binimg[y0:y1, x0:x1]
    return cv2.resize(cropped, (100, 160), interpolation=cv2.INTER_NEAREST)


def _segments_mask(h=160, w=100):
    A = (slice(int(0.00 * h), int(0.18 * h)), slice(int(0.20 * w), int(0.80 * w)))
    B = (slice(int(0.18 * h), int(0.50 * h)), slice(int(0.70 * w), int(0.98 * w)))
    C = (slice(int(0.50 * h), int(0.82 * h)), slice(int(0.70 * w), int(0.98 * w)))
    D = (slice(int(0.82 * h), int(1.00 * h)), slice(int(0.20 * w), int(0.80 * w)))
    E = (slice(int(0.50 * h), int(0.82 * h)), slice(int(0.02 * w), int(0.30 * w)))
    F = (slice(int(0.18 * h), int(0.50 * h)), slice(int(0.02 * w), int(0.30 * w)))
    G = (slice(int(0.40 * h), int(0.60 * h)), slice(int(0.20 * w), int(0.80 * w)))
    return [A, B, C, D, E, F, G]


def sevenseg_digit(img, on_thresh=0.45):
    """
    img: np.ndarray (BGR or gray) or path string
    on_thresh: fraction of white pixels in a segment to count it as 'on'
    """
    if isinstance(img, str):
        im = cv2.imread(img, cv2.IMREAD_COLOR)
        if im is None:
            return "?"
    else:
        im = img
    bw = _binarize(im)  # 100x160, white=segments
    segs = _segments_mask(160, 100)
    bits = 0
    for i, (yr, xr) in enumerate(segs):
        roi = bw[yr, xr]
        frac_on = cv2.countNonZero(roi) / roi.size
        if frac_on >= on_thresh:
            bits |= 1 << (6 - i)  # A=bit6 ... G=bit0
    return SEG_MAP.get(bits, "?")


# ---------- usage ----------
# single image file:
# print(sevenseg_digit(r"C:\path\to\cropped_digit.png"))
#
# from a numpy frame (already cropped to one digit):
# digit_char = sevenseg_digit(digit_img)
# print(digit_char)
