import { Timestamp } from "firebase/firestore";

export default interface Patient {
    id: string;
    name: string;
    birthdate: Timestamp;
    gender: string;
    contact: string;
    emergency_name: string;
    emergency_contact: string;
}