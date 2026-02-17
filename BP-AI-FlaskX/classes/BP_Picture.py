import os
import re
import subprocess
import cv2
import time
import numpy as np

# import easyocr
# from classes.my_mnist import mnist_predict_digit
# from digit_test import sevenseg_digit

PSM = 6  # 6=block of text; use 7 if reading a single number
CONFIG = f"--oem 1 --psm {PSM} -c tessedit_char_whitelist=0123456789:/."
# reader = easyocr.Reader(["en"])

x_width = 0.07
y_width = 0.20

start_x = 0.512
start_y = 0.15
loc_x_diff = 0.07

sys1_loc_x = start_x - 0.001
sys1_loc_y = start_y

sys2_loc_x = start_x + loc_x_diff - 0.001
sys2_loc_y = start_y

sys3_loc_x = start_x + loc_x_diff * 2
sys3_loc_y = start_y

dia1_loc_x = start_x - 0.001
dia1_loc_y = start_y + 0.21

dia2_loc_x = start_x + loc_x_diff  - 0.003
dia2_loc_y = start_y + 0.21

dia3_loc_x = start_x + loc_x_diff * 2 - 0.002
dia3_loc_y = start_y + 0.21




def preprocess_for_ocr(img_bgr, loc_x: float, loc_y: float, output_name: str):
    # 1) crop a center ROI (adjust if needed)
    h, w = img_bgr.shape[:2]

    loc = (
        int(w * loc_x),
        int(h * loc_y),
        int(w * (loc_x + x_width)),
        int(h * (loc_y + y_width)),
    )

    x0, y0, x1, y1 = loc
    roi = img_bgr[y0:y1, x0:x1]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    img = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    # OCR
    cv2.imwrite(output_name, img)

    #! EASYOCR
    # text = str(
    #     reader.readtext(roi, detail=0, paragraph=False, allowlist="0123456789")
    # )

    #! MNIST
    # text = str(mnist_predict_digit(roi))

    #! SSOCR
    file_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    img_path = os.path.join(file_dir, output_name)
    cmd = ["wsl", "ssocr", "-d", "1", f"/mnt/c{img_path[2:].replace('\\', '/')}"]
    subprocess.run(cmd)
    result = subprocess.run(cmd, capture_output=True, text=True)
    output = result.stdout.strip()
    match = re.search(r"\d+", output)
    number = int(match.group()) if match else 0

    return number


class BP_Picture:
    def __init__(self, cam_index=0):
        self.cap = cv2.VideoCapture(cam_index, cv2.CAP_DSHOW)
        if not self.cap.isOpened():
            raise SystemExit("No camera found.")
        # keep the buffer small and try to tame exposure
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        self.cap.set(cv2.CAP_PROP_AUTO_EXPOSURE, 0.25)  # 0.25 = manual for some drivers
        self.cap.set(cv2.CAP_PROP_EXPOSURE, -6)  # tweak per camera

    def read(self):
        # flush stale frames
        start = time.time()
        while time.time() - start < 0.4:
            self.cap.grab()

        ok, frame = self.cap.read()
        if not ok:
            raise SystemExit("Cannot read from camera.")

        number_s1 = preprocess_for_ocr(frame, sys1_loc_x, sys1_loc_y, "out_sys1.png")
        number_s2 = preprocess_for_ocr(frame, sys2_loc_x, sys2_loc_y, "out_sys2.png")
        number_s3 = preprocess_for_ocr(frame, sys3_loc_x, sys3_loc_y, "out_sys3.png")
        number_d1 = preprocess_for_ocr(frame, dia1_loc_x, dia1_loc_y, "out_dia1.png")
        number_d2 = preprocess_for_ocr(frame, dia2_loc_x, dia2_loc_y, "out_dia2.png")
        number_d3 = preprocess_for_ocr(frame, dia3_loc_x, dia3_loc_y, "out_dia3.png")

        if number_s1 == 7:
            number_s1 = 1

        if number_s1 > 1:
            # return 0, 0
            number_s1 = 1

        # if number_d1 > 1:
        #     return 0, 0

        sys = number_s1 * 100 + number_s2 * 10 + number_s3
        dia = number_d1 * 100 + number_d2 * 10 + number_d3

        if sys < 50:
            sys += 100

        while dia > 99:
            dia = dia - 100

        if dia < 50:
            return 0, 0

        print("\n--- OCR RESULT: " + str(sys) + "," + str(dia))

        return sys, dia

    def __del__(self):
        try:
            self.cap.release()
            cv2.destroyAllWindows()
        except:  # safe teardown if gc runs at exit
            pass
