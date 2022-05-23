import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { TodoList } from '../todo-list';

import { useTodosStore } from './use-todos-store';

export function TodosComponent() {
    const todosStore = useTodosStore();

    useEffect(() => {
        todosStore.initialize();
    }, [todosStore]);

    return (
        <ul>
            {todosStore.todos.map(todo => (
                <li className="max-w-xs" key={todo.id}>
                    <TodoList title={todo.title} id={todo.id} />
                </li>
            ))}
        </ul>
    );
}

export const Todos: React.FC<Record<string, never>> = observer(TodosComponent);
