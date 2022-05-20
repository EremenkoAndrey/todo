import { makeAutoObservable } from 'mobx';

import { ONE_DAY_IN_MILLISECOND } from './constants';

import { ITodo, TodoSource } from './types';

interface ITodosService {
    getInitialTodos(): Promise<ITodo[]>;
    addTodos(sources: TodoSource[]): Promise<ITodo[]>;
}

export class TodosStore {
    public todos: Array<ITodo> = [];

    constructor(private _todosService: ITodosService) {
        makeAutoObservable(this);
    }

    public async initialize() {
        this.todos = await this._todosService.getInitialTodos();
        console.log('initialize todos', this.todos);
        if (this.todos.length > 0) {
            return this.todos;
        }
        const maxItemsAmount = 3;
        const newTodos: TodoSource[] = [];
        for (let i = 0; i < maxItemsAmount; i += 1) {
            const todoItem = this._createTodoSource(newTodos[i - 1]);
            newTodos.push(todoItem);
        }
        this.todos = await this._todosService.addTodos(newTodos);
        console.log('crated initialize todos', this.todos);
    }

    private _createTodoSource(lastItem?: TodoSource): TodoSource {
        const date = lastItem ? this._addDay(lastItem.date) : new Date();
        const title = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return {
            title,
            date
        };
    }

    private _addDay(date: Date) {
        return new Date(date.valueOf() + ONE_DAY_IN_MILLISECOND);
    }
}
