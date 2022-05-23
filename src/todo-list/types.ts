export interface ITodoItem {
    id: string;
    parentId: string;
    text: string;
    done: boolean;
}
export interface TodoItemEntity {
    id?: number;
    parentId: number;
    text: string;
    done: boolean;
}
export type TodoItemSource = Omit<ITodoItem, 'id'>;
