import { TodoItemEntity, TodoItemSource } from './types';
import { TodoItemDto } from './todo-item.dto';

interface IExternalApi {
    addTodoItem(item: TodoItemEntity): Promise<number>;
}

export class TodoListService {
    constructor(private _externalApi: IExternalApi) {}

    public async addTodoItem(item: TodoItemSource) {
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
