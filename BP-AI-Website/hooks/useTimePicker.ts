import { Timestamp } from "firebase/firestore";
import useLocalStorage from "./useLocalStorage";
import useModal from "./useModal";
import { useS } from "./useReactHooks";

export function useTimePicker(onUpdate: (hour: number, minute: number, meridian: "AM" | "PM") => void) {
    0
    const [hour, setHour] = useS(9);
    const [minute, setMinute] = useS(0);
    const [meridian, setMeridian] = useS<"AM" | "PM">(
        "AM"
    );
    const modal = useModal();

    const minuteStr = minute < 10 ? `0${minute}` : minute.toString();

    const timeStr = `${hour}:${minuteStr} ${meridian}`;

    function fromDate(date: Date) {
        setHour(date.getHours() % 12 || 12);
        setMinute(date.getMinutes());
        setMeridian(date.getHours() < 12 ? "AM" : "PM");
    }

    function fromTimestamp(timestamp: Timestamp) {
        const date = timestamp.toDate();
        fromDate(date);
    }


    return { hour, minute, meridian, setHour, setMinute, setMeridian, modal, timeStr, fromDate, fromTimestamp, onUpdate };
}