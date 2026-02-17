import Resizer from "react-image-file-resizer"; // Import the library

export const resizeImageFile = (file: File): Promise<File> => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            640, // width
            480, // height
            "JPEG", // format
            100, // quality
            0, // rotation
            (resizedFile) => {
                resolve(
                    new File([resizedFile as Blob], file.name, { type: file.type })
                );
            },
            "blob" // output type
        );
    });
};