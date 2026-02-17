import cv2, numpy as np

img = cv2.imread(r"C:\Users\ACER\Desktop\5.png", cv2.IMREAD_GRAYSCALE)
_, bin0 = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Make the digit the foreground (white) so morphology "closes" the strokes
fg = cv2.bitwise_not(bin0)  # black->white

# Bridge breaks efficiently with directional line kernels
max_gap = 7  # ~length of gaps to bridge (tune 5–15)
hK = cv2.getStructuringElement(cv2.MORPH_RECT, (max_gap, 1))
vK = cv2.getStructuringElement(cv2.MORPH_RECT, (1, max_gap))

closed_h = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, hK, iterations=1)
closed_v = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, vK, iterations=1)
closed = cv2.bitwise_or(closed_h, closed_v)

# Optional: small clean-up
closed = cv2.morphologyEx(
    closed, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3)), 1
)

out = cv2.bitwise_not(closed)  # back to black digit on white
cv2.imwrite(r"C:\Users\ACER\Desktop\5a.png", out)
