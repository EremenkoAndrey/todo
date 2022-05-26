import React from 'react';
import { observer } from 'mobx-react';

import { Button } from '../core/shared';

import { useTodoLitStore } from './use-todo-lit-store';
import { ADD } from './dictionary';
import { TodoItem } from './TodoItem';
import { ITodoItem } from './types';

type Props = {
    id: string;
    title: string;
    items: Array<ITodoItem>;
}

export function TodoListComponent(props: Props) {
    const { id, title, items } = props;
    const todoLitStore = useTodoLitStore(id, items);

    const add = () => todoLitStore.add();

    const update = (todoItem: ITodoItem) => {
        todoLitStore.update(todoItem);
    };

    return (
        <div className="border-2">
            <div className="text-center p-2 font-semibold border-b-2">
                {title}
            </div>

            {todoLitStore.items.map((todoItem) => {
                return (
                    <TodoItem
                        key={todoItem.id}
                        text={todoItem.text}
                        onContentChanged={text => update({
                            ...todoItem,
                            text
                        })}
                        className="border-b-2"
                    />
                )
            })}

            <div className="flex justify-center py-2">
                <Button onClick={add}>{ADD}</Button>
            </div>
        </div>
    );
}

export const TodoList: React.FC<Props> = observer(TodoListComponent);
