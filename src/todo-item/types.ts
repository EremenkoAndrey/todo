export interface ITodoItem {
    id: string;
    parentId: string;
    text: string;
    done: boolean;
}
export type TodoItemProps = Omit<ITodoItem, 'parentId'>;
