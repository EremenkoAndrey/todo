import Dexie, { Table } from 'dexie';

import { TodoEntity } from './types';

const VERSION = 1;

export class TodoDbService extends Dexie {
    public todos!: Table<TodoEntity, number>;

    constructor() {
        super('todoApp');

        this.version(VERSION).stores({
            todos: '++id, timestamp'
        });

    }

    public getTodos(timestamp: number, limit = 1) {
        return this.todos
            .where('timestamp')
            .above(timestamp)
            .limit(limit)
            .toArray();
    }

    public addTodos(items: TodoEntity[]) {
        return this.todos.bulkAdd<true>(items, { allKeys: true });
    }

    public clear() {
        return this.todos.clear();
    }
}
