export type TodoItem = {
    isChecked: boolean;
    timestamp: { seconds: number; nanoseconds: number }; // Firebase timestamp format
    todo: string;
};