import { makeAutoObservable } from 'mobx';

import { ONE_DAY_IN_MILLISECOND } from './constants';

import { ITodo, TodoBlank } from './types';

interface ITodosService {
    getInitialTodos(limit: number): Promise<ITodo[]>;
    addTodoList(sources: TodoBlank[]): Promise<ITodo[]>;
}

export class TodosStore {
    public todos: Array<ITodo> = [];

    constructor(private _todosService: ITodosService) {
        makeAutoObservable(this);
    }

    public async initialize() {
        const prevDaysAmount = 2;
        const nextDaysAmount = 7;
        const limit = prevDaysAmount + 1 + nextDaysAmount;
        const existingTodos = await this._todosService.getInitialTodos(limit);
        if (existingTodos.length === limit) {
            this.todos = existingTodos;
            return;
        }
        const nowDate = new Date();

        function getDate(egoDaysAmount: number) {
            if (egoDaysAmount === 0) {
                return new Date();
            }
            const daysInMs = Math.abs(egoDaysAmount) * ONE_DAY_IN_MILLISECOND;
            if (egoDaysAmount < 0) {
                return new Date(nowDate.valueOf() - daysInMs);
            }
            return new Date(nowDate.valueOf() + daysInMs);
        }

        function createTodoBlank(date: Date): TodoBlank {
            const title = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
            return {
                title,
                date
            };
        }

        const daysSet = new Set<string>();
        const getUniqueKeyOfTheDay = (date: Date) => `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
        existingTodos.forEach((todo) => {
            daysSet.add(getUniqueKeyOfTheDay(todo.date));
        });
        const blanks: Array<TodoBlank> = [];
        for (let i = 0; i < limit; i += 1) {
            const date = getDate(i - prevDaysAmount);
            if (!daysSet.has(getUniqueKeyOfTheDay(date))) {
                const blank = createTodoBlank(date);
                blanks.push(blank);
            }
        }
        const newTodos = await this._todosService.addTodoList(blanks);
        this.todos = [...existingTodos, ...newTodos].sort((a, b) => a.date.valueOf() - b.date.valueOf());
        console.log('this.todos', this.todos);
    }
}
