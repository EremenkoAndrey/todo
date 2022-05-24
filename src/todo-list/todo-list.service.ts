import { ITodoItem, TodoItemEntity, TodoItemSource } from './types';
import { TodoItemDto } from './todo-item.dto';

interface IExternalApi {
    addTodoItem(item: TodoItemEntity): Promise<number>;
    updateTodoItem(id: number, changes: Partial<TodoItemEntity>): Promise<boolean>;
}

export class TodoListService {
    constructor(private _externalApi: IExternalApi) {}

    public async createTodoItem(item: TodoItemSource) {
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

    public updateTodoItem(itemId: string, changes: Partial<ITodoItem>) {
        const entityId = Number.parseInt(itemId);
        const entityChanges: Partial<TodoItemEntity> = {
            ...changes,
            id: undefined,
            parentId: changes.parentId ? Number.parseInt(changes.parentId) : undefined
        };
        console.log('updateTodoItem', itemId, changes)
        return this._externalApi.updateTodoItem(entityId, entityChanges);
    }
}
