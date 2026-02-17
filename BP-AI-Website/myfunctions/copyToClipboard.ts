import notify from "./notify";

export default function copyToClipboard(text: string): void {
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(text)
            .then(() => notify("Text copied successfully!", { type: "success" }))
            .catch((err) => notify("Failed to copy text"));
    } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "-1000px";
        textarea.style.left = "-1000px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand("copy");
            notify("Text copied successfully!", { type: "success" });
        } catch (err) {
            notify("Failed to copy text");
        }

        document.body.removeChild(textarea);
    }
};
