import { makeAutoObservable } from 'mobx';

import { ITodoItem, TodoItemProps } from './types';

interface ITodoItemService {
    updateTodoItem(itemId: string, changes: Partial<ITodoItem>): Promise<boolean>;
}

export class TodoItemStore {
    public readonly id: string;

    public text: string;

    public done: boolean;

    public contentEditable: boolean;

    constructor(
        todoItem: TodoItemProps,
        private _todoItemService: ITodoItemService
    ) {
        this.id = todoItem.id;
        this.text = todoItem.text;
        this.done = todoItem.done;
        this.contentEditable = false;
        makeAutoObservable(this);
    }

    public async updateItem() {
        await this._todoItemService.updateTodoItem(this.id, {
            text: this.text,
            done: this.done
        });
    }

    public setContentEditable(contentEditable: boolean) {
        this.contentEditable = contentEditable;
    }

    public setDone(done: boolean) {
        this.done = done;
        this.updateItem();
    }

    public setText(text: string) {
        this.text = text;
    }
}
