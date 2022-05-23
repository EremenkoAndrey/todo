import { ITodoItem, TodoItemEntity } from './types';

export class TodoItemDto implements ITodoItem {
    public readonly id: string;

    public readonly parentId: string;

    public readonly text: string;

    public readonly done: boolean;

    public static create(entity: TodoItemEntity) {
        return new TodoItemDto({
            id: `${entity.id}`,
            parentId: `${entity.parentId}`,
            text: entity.text,
            done: entity.done
        });
    }

    constructor(todoItem: ITodoItem) {
        this.id = todoItem.id;
        this.parentId = todoItem.id;
        this.text = todoItem.text;
        this.done = todoItem.done;
    }
}
