import { TodoItemEntity } from '../core/indexed-db';
import { TodoItemDto } from '../todo-item';

import { TodoItemBlank } from './types';

interface IExternalApi {
    addTodoItem(item: TodoItemEntity): Promise<number>;
}

export class TodoListService {
    constructor(private _externalApi: IExternalApi) {}

    public async createTodoItem(item: TodoItemBlank) {
        const parentId = Number.parseInt(item.parentId);
        const id = await this._externalApi.addTodoItem({
            parentId,
            done: item.done,
            text: item.text
        });
        return TodoItemDto.create({
            id,
            parentId,
            done: item.done,
            text: item.text
        });
    }
}
