export interface ITodoItem {
    id: string;
    parentId: string;
    text: string;
    done: boolean;
}
export type TodoItemSource = Omit<ITodoItem, 'id'>;
