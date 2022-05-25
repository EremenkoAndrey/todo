import { TodoListEntity } from '../core/indexed-db';

import { TodoDto } from './todo.dto';
import { ONE_DAY_IN_MILLISECOND } from './constants';
import { TodoSource } from './types';

interface IExternalApi {
    getTodoList: (timestamp: number, limit?: number) => Promise<TodoListEntity[]>;
    addTodoLists: (todoLists: TodoListEntity[]) => Promise<number[]>;
}

export class TodosService {
    constructor(private _externalApi: IExternalApi) {}

    public async getInitialTodos() {
        const todoLists = await this._externalApi.getTodoList(Date.now() - ONE_DAY_IN_MILLISECOND, 3);
        return todoLists.map(todoListEntity => TodoDto.create(todoListEntity));
    }

    public async addTodoList(items: TodoSource[]) {
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
            return TodoDto.create({ id, ...entity });
        });
    }
}
