export default function getQueryParameters(url: string): Record<string, string> {
    if (!url) return {};

    try {
        const urlObj = new URL(url);
        const params: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    } catch (error) {
        console.error("Invalid URL:", error);
        return {};
    }
}