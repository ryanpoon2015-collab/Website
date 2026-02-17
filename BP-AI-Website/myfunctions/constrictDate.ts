export default function constrictDate(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s`;

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hour = Math.floor(min / 60);
    if (hour < 24) return `${hour}h`;
    const day = Math.floor(hour / 24);
    if (day < 7) return `${day}d`;
    const week = Math.floor(day / 7);
    if (week < 4) return `${week}w`;
    const month = Math.floor(day / 30);
    if (month < 12) return `${month}M`;
    const year = Math.floor(day / 365);

    return `${year}y`;
}