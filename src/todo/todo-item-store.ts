import { makeAutoObservable } from 'mobx';

type TodoItem = {
    id: string;
    text: string;
    done: boolean;
}

export class TodoItemStore {
    public id: string;

    public text: string;

    public done: boolean;

    public contentEditable: boolean;

    constructor(todoItem: TodoItem) {
        this.id = todoItem.id;
        this.text = todoItem.text;
        this.done = todoItem.done;
        this.contentEditable = false;

        makeAutoObservable(this);
    }

    // public onEditingStarted() {
    //     this.setContentEditable(true);
    // }
    //
    // public onEditingFinished(content: string) {
    //     this.setContentEditable(false);
    //     this.setText(content);
    // }

    public setText(text: string) {
        this.text = text;
    }

    public setContentEditable(contentEditable: boolean) {
        this.contentEditable = contentEditable;
    }
}
