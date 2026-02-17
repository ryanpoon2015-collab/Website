import { Timestamp } from "firebase/firestore";

export default interface LogDevice {
    id: string;
    name: string;
    birthdate: Timestamp;
    gender: string;
    contact: string;
    weight: number;
    height: number;
    patient_id: string;
    pdf_name: string;
    url: string;
    symptoms: string;
    physician: string;
    body_temp: number;
    heart_rate: number;
    spo2: number;
    bp_sys: number;
    bp_dia: number;
};