# Windows + Python wrapper for SSOCR (runs SSOCR inside WSL).
# Usage:
#   txt = sevenseg_from_image(r"C:\path\to\crop.png", ssocr_args=["invert", "threshold", "110"])
#   txt = sevenseg_from_camera(1, crop=(x,y,w,h))  # optional crop

import subprocess, shlex, tempfile, os, cv2


def _win_to_wsl_path(win_path: str) -> str:
    drive, rest = win_path[0].lower(), win_path[2:].replace("\\", "/")
    return f"/mnt/{drive}{rest}"


def _run_ssocr_wsl(img_path_win: str, ssocr_args=None) -> str:
    ssocr_args = ssocr_args or []  # e.g. ["invert", "threshold", "120"]
    img_path_wsl = _win_to_wsl_path(os.path.abspath(img_path_win))
    cmd = ["wsl", "ssocr", *ssocr_args, img_path_wsl]
    out = subprocess.run(cmd, capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError(f"ssocr error:\n{out.stderr or out.stdout}")
    return out.stdout.strip()


def sevenseg_from_image(img_path_win: str, ssocr_args=None) -> str:
    return _run_ssocr_wsl(img_path_win, ssocr_args)


def sevenseg_from_camera(cam_index=0, crop=None, ssocr_args=None) -> str:
    cap = cv2.VideoCapture(cam_index)
    ok, frame = cap.read()
    cap.release()
    if not ok:
        raise SystemExit("Cannot read from camera.")
    if crop:
        x, y, w, h = crop
        frame = frame[y : y + h, x : x + w]
    # save temp PNG (lossless), call ssocr, delete
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tf:
        tmp_path = tf.name
    try:
        cv2.imwrite(tmp_path, frame)
        return _run_ssocr_wsl(tmp_path, ssocr_args)
    finally:
        try:
            os.remove(tmp_path)
        except:
            pass


if __name__ == "__main__":
    # Example: for typical LCDs, try inverting + a threshold around 110–140
    print(
        sevenseg_from_image(
            r"C:\Users\USER\Desktop\bp_crop.png",
            ssocr_args=["invert", "threshold", "120"],
        )
    )
