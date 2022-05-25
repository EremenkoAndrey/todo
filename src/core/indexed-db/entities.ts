export interface TodoItemEntity {
    id?: number;
    parentId: number;
    text: string;
    done: boolean;
}
export interface TodoItem extends TodoItemEntity {
    id: number;
}
export interface TodoListEntity {
    id?: number;
    title: string;
    timestamp: number;
}
export interface TodoList extends TodoListEntity {
    id: number;
    items: Array<TodoItemEntity>;
    title: string;
    timestamp: number;
}

