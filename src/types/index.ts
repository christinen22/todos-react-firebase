import { Timestamp } from "firebase/firestore";

export type TodoItem = {
    id: string,
    isChecked: boolean;
    timestamp: Timestamp
    todo: string;
};