import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { Todo } from '../todo';

import { useTodosStore } from './use-todos-store';

export function TodosComponent() {
    const todosStore = useTodosStore();

    useEffect(() => {
        todosStore.initialize();
    }, [todosStore]);

    return (
        <div>
            {todosStore.todos.map(todo => (
                <div key={todo.id}>
                    <Todo title={todo.title} />
                </div>
            ))}
        </div>
    );
}

export const Todos: React.FC<Record<string, never>> = observer(TodosComponent);
