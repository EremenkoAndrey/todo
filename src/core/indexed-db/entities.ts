export interface TodoListEntity {
    id?: number;
    title: string;
    timestamp: number;
}
export interface TodoItemEntity {
    id?: number;
    parentId: number;
    text: string;
    done: boolean;
}
