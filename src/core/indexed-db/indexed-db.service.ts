import Dexie, { Table } from 'dexie';

import { TodoItemEntity, TodoListEntity } from './entities';

const VERSION = 1;

export class IndexedDbService extends Dexie {
    public todoLists!: Table<TodoListEntity, number>;

    public todoItems!: Table<TodoItemEntity, number>;

    constructor() {
        super('todoApp');

        this.version(VERSION).stores({
            todoLists: '++id, timestamp',
            todoItems: '++id, parentId'
        });

    }

    public getTodoList(timestamp: number, limit = 1) {
        return this.todoLists
            .where('timestamp')
            .above(timestamp)
            .limit(limit)
            .toArray();
    }

    public addTodoList(todoList: TodoListEntity[]) {
        return this.todoLists.bulkAdd<true>(todoList, { allKeys: true });
    }

    public addTodoItem(todoItem: TodoItemEntity) {
        return this.todoItems.add(todoItem);
    }

    public clear() {
        return this.todoLists.clear();
    }
}
