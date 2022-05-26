import { makeAutoObservable } from 'mobx';

import { ITodoItem, TodoItemSource } from './types';

interface ITodoListService {
    updateTodoItem(itemId: string, changes: Partial<ITodoItem>): Promise<boolean>;
    createTodoItem(item: TodoItemSource): Promise<ITodoItem>;
}

export class TodoListStore {
    private readonly _id: string;

    public items: Array<ITodoItem>;

    constructor(
        id: string,
        items: Array<ITodoItem>,
        private _todoListService: ITodoListService
    ) {
        this._id = id;
        this.items = items;
        makeAutoObservable(this);
    }

    public add() {
        this.items.push({
            id: '',
            parentId: this._id,
            text: '',
            done: false
        });
    }

    public async update(todoItem: ITodoItem): Promise<ITodoItem> {
        if (todoItem.id) {
            await this._todoListService.updateTodoItem(todoItem.id, todoItem);
            this._replaceItem(todoItem);
            return todoItem;
        }
        const newItem = await this._todoListService.createTodoItem(todoItem);
        this._replaceItem(newItem);
        return newItem;
    }

    private _replaceItem(todoItem: ITodoItem) {
        this.items = this.items.map(item => (!item.id || item.id === todoItem.id) ? todoItem : item);
    }
}
