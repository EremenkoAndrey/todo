import { TodoList } from '../core/indexed-db';

import { ITodoItem, TodoItemDto } from '../todo-item';

import { ITodo } from './types';

export class TodoDto implements ITodo {
    public readonly id: string;

    public readonly title: string;

    public readonly date: Date;

    public readonly items: Array<ITodoItem>;

    public static create(entity: TodoList) {
        return new TodoDto({
            id: `${entity.id}`,
            title: entity.title,
            date: new Date(entity.timestamp),
            items: entity.items.map(todoItem => TodoItemDto.create(todoItem))
        });
    }

    constructor(todo: ITodo) {
        this.id = todo.id;
        this.title = todo.title;
        this.date = todo.date;
        this.items = todo.items;
    }
}
