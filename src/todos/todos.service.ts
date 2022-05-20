import { TodoDto } from './todo.dto';
import { ONE_DAY_IN_MILLISECOND } from './constants';

import { TodoEntity, TodoSource } from './types';

interface Todo {
    id?: number;
    title: string;
    timestamp: number;
}
interface IRemoteApi {
    getTodos(timestamp: number, limit?: number): Promise<Todo[]>;
    addTodos(items: TodoEntity[]): Promise<number[]>;
    clear(): Promise<void>;
}

export class TodosService {
    constructor(private _remoteApi: IRemoteApi) {}

    public async getInitialTodos() {
        const todos = await this._remoteApi.getTodos(Date.now() - ONE_DAY_IN_MILLISECOND, 3);
        console.log('todos', todos);
        return todos.map(todoEntity => TodoDto.create(todoEntity));
    }

    public async addTodos(items: TodoSource[]) {
        const entities = items.map(todo => ({
            title: todo.title,
            timestamp: todo.date.valueOf()
        }));
        const todos = await this._remoteApi.addTodos(entities);
        return todos.map((id, index) => {
            const entity = entities[index];
            if (!entity) {
                throw new Error('TodoEntity not found');
            }
            return TodoDto.create({ id, ...entity });
        });
    }
}
