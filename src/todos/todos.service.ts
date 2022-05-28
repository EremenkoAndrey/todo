import { TodoList, TodoListEntity } from '../core/indexed-db';

import { TodoDto } from './todo.dto';
import { ONE_DAY_IN_MILLISECOND } from './constants';
import { TodoBlank } from './types';

interface IExternalApi {
    getTodoList: (timestamp: number, limit?: number) => Promise<TodoList[]>;
    addTodoLists: (todoLists: TodoListEntity[]) => Promise<number[]>;
}

export class TodosService {
    constructor(private _externalApi: IExternalApi) {}

    public async getInitialTodos(limit: number) {
        const todoLists = await this._externalApi.getTodoList(Date.now() - 3 * ONE_DAY_IN_MILLISECOND, limit);
        return todoLists.map(todoListEntity => TodoDto.create(todoListEntity));
    }

    public async addTodoList(items: TodoBlank[]) {
        const entities = items.map(todo => ({
            title: todo.title,
            timestamp: todo.date.valueOf()
        }));
        const ids = await this._externalApi.addTodoLists(entities);
        return ids.map((id, index) => {
            const entity = entities[index];
            if (!entity) {
                throw new Error('TodoEntity not found');
            }
            return TodoDto.create({
                id,
                ...entity,
                items: []
            });
        });
    }
}
