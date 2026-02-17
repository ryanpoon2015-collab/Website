import { Timestamp } from "firebase/firestore";

export interface SocialMediaComment {
    id: string;
    content: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    user_id: string;
    post_id: string;
}