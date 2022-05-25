import { TodoListEntity } from '../core/indexed-db';

import { ITodo } from './types';

export class TodoDto implements ITodo {
    public readonly id: string;

    public readonly title: string;

    public readonly date: Date;

    public static create(entity: TodoListEntity) {
        return new TodoDto({
            id: `${entity.id}`,
            title: entity.title,
            date: new Date(entity.timestamp)
        });
    }

    constructor(todo: ITodo) {
        this.id = todo.id;
        this.title = todo.title;
        this.date = todo.date;
    }
}
