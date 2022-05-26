import { ITodoItem } from '../todo-list';

export interface ITodo {
    id: string,
    title: string;
    date: Date;
    items: Array<ITodoItem>;
}

export type TodoSource = Omit<ITodo, 'id' | 'items'>;
