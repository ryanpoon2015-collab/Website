export default function countListItems<T extends string | number>(list: T[]): Record<T, number> {
    return list.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {} as Record<T, number>);
}

export function countedItemsToList<T extends string | number>(countedItems: Record<T, number>): T[] {
    return Object.entries(countedItems).flatMap(([item, count]) => Array(count).fill(item as T)) as T[];
}