export default interface PatientRecord {
    id: string;
    temperature: number;
    heart_rate: number;
    spo2: number;
    bp_sys: number;
    bp_dia: number;
    result: string;
    attending_physician: string;
}