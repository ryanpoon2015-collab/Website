export default function maxDecimals(value: number, decimals: number = 2): string {
    return value.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
    });
}