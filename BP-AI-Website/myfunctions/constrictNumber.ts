export default function constrictNumber(x: number) {
    if (x < 1000) return x;
    if (x > 1000) return `${(x / 1000).toFixed(1)}K`;
    if (x > 1000000) return `${(x / 1000000).toFixed(1)}M`;
}