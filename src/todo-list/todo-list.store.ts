import { makeAutoObservable } from 'mobx';

import { ITodoItem, TodoItemSource } from './types';

interface ITodoListService {
    addTodoItem(item: TodoItemSource): Promise<ITodoItem>
}

export class TodoListStore {
    private readonly _parentId: string;

    public items: Array<ITodoItem> = [];

    constructor(
        parentId: string,
        private _todoListService: ITodoListService
    ) {
        this._parentId = parentId;
        makeAutoObservable(this);
    }

    public add() {
        this.items.push({
            id: '',
            parentId: this._parentId,
            text: '',
            done: false
        });
    }

    public async save(text: string, done: boolean) {
        const todo = await this._todoListService.addTodoItem({
            parentId: this._parentId,
            text,
            done
        });
        this.items.push(todo);
    }
}
