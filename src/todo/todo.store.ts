import { makeAutoObservable } from 'mobx';

import { TodoItemStore } from './todo-item-store';

export class TodoStore {
    public itemStores: Array<TodoItemStore> = [];

    private _lastId = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public addTodo() {
        this.itemStores.push(new TodoItemStore({
            id: this._createUniqueId(),
            text: '',
            done: false
        }));
    }

    private _createUniqueId() {
        this._lastId += 1;
        return `${this._lastId}`;
    }
}
