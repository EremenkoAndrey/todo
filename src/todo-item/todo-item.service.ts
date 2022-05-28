import { TodoItemEntity } from '../core/indexed-db';

import type { ITodoItem } from './types';

interface IExternalApi {
    updateTodoItem(id: number, changes: Partial<TodoItemEntity>): Promise<boolean>;
}

export class TodoItemService {
    constructor(private _externalApi: IExternalApi) {}

    public updateTodoItem(itemId: string, changes: Partial<ITodoItem>) {
        const { text, done } = changes;
        const entityId = Number.parseInt(itemId);
        const entityChanges: Partial<TodoItemEntity> = { text, done };

        return this._externalApi.updateTodoItem(entityId, entityChanges);
    }
}
