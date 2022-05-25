import Dexie, { PromiseExtended, Table } from 'dexie';

import { TodoItemEntity, TodoList, TodoListEntity } from './entities';

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

    public getTodoList(timestamp: number, limit = 1): PromiseExtended<TodoList[]> {
        return this.todoLists
            .where('timestamp')
            .above(timestamp)
            .limit(limit)
            .toArray((todoList) => {
                const todos = new Map<number, TodoList>();
                todoList.forEach((entity) => {
                    const id = entity.id;
                    if (!id) {
                        throw new Error('Incorrect entity id');
                    }
                    todos.set(id, {
                        id,
                        ...entity,
                        items: []
                    });
                });

                return this.todoItems
                    .where('parentId')
                    .anyOf(Array.from(todos.keys()))
                    .toArray((todoItems) => {
                        todoItems.map((todoItem) => {
                            const parent = todos.get(todoItem.parentId);
                            if (parent) {
                                parent.items.push(todoItem);
                            }
                            return todoItem;
                        });
                        return Array.from(todos.values());
                    });
            });
    }

    public addTodoLists(todoLists: TodoListEntity[]) {
        return this.todoLists.bulkAdd<true>(todoLists, { allKeys: true });
    }

    public addTodoItem(todoItem: TodoItemEntity) {
        return this.todoItems.add(todoItem);
    }

    public async updateTodoItem(id: number, changes: Partial<TodoItemEntity>) {
        const amountOfUpdatedElements = await this.todoItems.update(id, changes);
        return amountOfUpdatedElements !== 0;
    }

    public clear() {
        return this.todoLists.clear();
    }
}
