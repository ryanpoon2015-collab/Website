export default abstract class Money {
    static format(value: number | undefined, decimal: number = 2, withoutPeso = false): string {
        let formattedValue = (value || 0).toLocaleString("en-PH", {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal,
        });
        if (!withoutPeso) {
            formattedValue = "₱ " + formattedValue;
        }
        return formattedValue;
    }
}