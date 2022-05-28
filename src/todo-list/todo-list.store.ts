import { makeAutoObservable } from 'mobx';

import { ITodoItem } from '../todo-item';

import { TodoItemBlank } from './types';

interface ITodoListService {
    createTodoItem(item: TodoItemBlank): Promise<ITodoItem>;
}

export class TodoListStore {
    private readonly _id: string;

    public readonly items: Array<ITodoItem>;

    constructor(
        id: string,
        items: Array<ITodoItem>,
        private _todoListService: ITodoListService
    ) {
        this._id = id;
        this.items = items;
        makeAutoObservable(this);
    }

    public async addItem(text: string) {
        if (text.trim().length === 0) {
            return;
        }
        const newItem = await this._todoListService.createTodoItem({
            parentId: this._id,
            done: false,
            text
        });
        this.items.push(newItem);
    }
}
