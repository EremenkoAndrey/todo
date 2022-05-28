import { ITodoItem } from '../todo-item';

export type TodoItemBlank = Omit<ITodoItem, 'id'>;
