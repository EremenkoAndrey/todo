import { ITodoItem } from '../todo-item';

export interface ITodo {
    id: string,
    title: string;
    date: Date;
    items: Array<ITodoItem>;
}

export type TodoBlank = Omit<ITodo, 'id' | 'items'>;
