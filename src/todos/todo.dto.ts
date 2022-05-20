import { ITodo, TodoEntity } from './types';

export class TodoDto implements ITodo {
    public readonly id: string;

    public readonly title: string;

    public readonly date: Date;

    public static create(todo: TodoEntity) {
        return new TodoDto({
            id: `${todo.id}`,
            title: todo.title,
            date: new Date(todo.timestamp)
        });
    }

    constructor(todo: ITodo) {
        this.id = todo.id;
        this.title = todo.title;
        this.date = todo.date;
    }
}
