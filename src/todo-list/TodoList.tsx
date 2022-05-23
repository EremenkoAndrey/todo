import React from 'react';
import { observer } from 'mobx-react';

import { Button } from '../core/shared';

import { useTodoLitStore } from './use-todo-lit-store';
import { ADD } from './dictionary';
import { TodoItem } from './TodoItem';

type Props = {
    id: string;
    title: string;
}

export function TodoListComponent(props: Props) {
    const { id, title } = props;
    const todoLitStore = useTodoLitStore(id);

    const addTodo = () => todoLitStore.add();

    return (
        <div className="border-2">
            <div className="text-center p-2 font-semibold border-b-2">
                {title}
            </div>

            {todoLitStore.items.map(todoItem => (
                <TodoItem
                    text={todoItem.text}
                    contentEditable={false}
                    onBlur={() => undefined}
                    onClick={() => undefined}
                    onTextChange={() => undefined}
                />
            ))}

            <div className="flex justify-center py-2">
                <Button onClick={addTodo}>{ADD}</Button>
            </div>
        </div>
    );
}

export const TodoList: React.FC<Props> = observer(TodoListComponent);
