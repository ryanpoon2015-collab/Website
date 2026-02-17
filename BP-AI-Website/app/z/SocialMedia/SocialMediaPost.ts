import { Timestamp } from "firebase/firestore";

export interface SocialMediaPost {
    id: string;
    content: string;
    data: number;
    created_at: Timestamp;
    updated_at: Timestamp;
    user_id: string;
    likes: string[];
}