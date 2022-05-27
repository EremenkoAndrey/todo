import { makeAutoObservable } from 'mobx';

import { ITodoItem, TodoItemSource } from './types';

interface ITodoListService {
    updateTodoItem(itemId: string, changes: Partial<ITodoItem>): Promise<boolean>;
    createTodoItem(item: TodoItemSource): Promise<ITodoItem>;
}

export class TodoListStore {
    private readonly _id: string;

    private _items: Array<ITodoItem>;

    constructor(
        id: string,
        items: Array<ITodoItem>,
        private _todoListService: ITodoListService
    ) {
        this._id = id;
        this._items = items;
        makeAutoObservable(this);
    }

    public get items() {
        return [
            ...this._items,
            {
                id: '',
                parentId: this._id,
                text: '',
                done: false
            }
        ];
    }

    public async updateItem(todoItem: ITodoItem) {
        if (todoItem.text.trim().length === 0) {
            return;
        }
        await this._todoListService.updateTodoItem(todoItem.id, todoItem);
        this._items = this._items.map((item) => {
            if (item.id === todoItem.id) {
                return todoItem;
            }
            return item;
        });
    }

    public async addItem(todoItem: ITodoItem) {
        if (todoItem.text.trim().length === 0) {
            return;
        }
        const newItem = await this._todoListService.createTodoItem(todoItem);
        this._items.push(newItem);
        return newItem;
    }
}
