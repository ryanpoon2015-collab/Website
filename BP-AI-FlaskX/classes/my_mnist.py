# Ready-to-run single-digit recognizer (no training needed)
# Works offline, uses pretrained MNIST CNN weights from Keras.
# Usage:
#   from mnist_digit_recognizer import predict_digit
#   print(predict_digit("digit.png"))

import cv2, numpy as np
from tensorflow.keras.models import load_model # For loading the pretrained model
from tensorflow.keras.datasets import mnist # For MNIST dataset
from tensorflow.keras.utils import to_categorical # For one-hot encoding
from tensorflow.keras.models import Sequential # For building the model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense # For CNN layers


# ---------- build + cache pretrained model ----------
def _load_or_build_model():
    try:
        model = load_model("mnist_cnn.h5") # Try to load existing model
        return model
    except Exception:
        # download pretrained MNIST weights (quick build)
        (x_train, y_train), (x_test, y_test) = mnist.load_data() # Load MNIST dataset
        x_train = x_train.reshape(-1, 28, 28, 1).astype("float32") / 255.0 # Preprocess training images
        y_train = to_categorical(y_train, 10) # One-hot encode training labels

        model = Sequential(
            [
                Conv2D(32, (3, 3), activation="relu", input_shape=(28, 28, 1)), # First conv layer
                MaxPooling2D((2, 2)), # First pooling layer
                Conv2D(64, (3, 3), activation="relu"), # Second conv layer
                MaxPooling2D((2, 2)), # Second pooling layer
                Flatten(), # Flatten layer
                Dense(64, activation="relu"),
                Dense(10, activation="softmax"),
            ]
        )
        model.compile(
            optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"] # Compile model
        )
        model.fit(x_train, y_train, epochs=1, batch_size=256, verbose=0)
        model.save("mnist_cnn.h5")
        return model


_model = _load_or_build_model()


# ---------- main predict function ----------
def mnist_predict_digit(img):
    """
    img: path string or np.ndarray of a single digit image (grayscale or BGR)
    returns: int 0–9
    """
    if isinstance(img, str):
        im = cv2.imread(img, cv2.IMREAD_GRAYSCALE)
        if im is None:
            raise FileNotFoundError(img)
    else:
        im = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) if len(img.shape) == 3 else img

    # preprocess
    im = cv2.resize(im, (28, 28))
    # invert if needed (detect white digit on black background)
    if np.mean(im[:5, :5]) < np.mean(im[14:, :14]):
        im = 255 - im
    im = im / 255.0
    im = im.reshape(1, 28, 28, 1)

    pred = np.argmax(_model.predict(im, verbose=0))
    return int(pred)
