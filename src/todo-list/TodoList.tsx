import React from 'react';
import { observer } from 'mobx-react';

import { ITodoItem, TodoItem } from '../todo-item';

import { AddForm } from './AddForm';
import { useTodoListStore } from './use-todo-list-store';

type Props = {
    id: string;
    title: string;
    items: Array<ITodoItem>;
}

export function TodoListComponent(props: Props) {
    const { id, title, items } = props;
    const todoLitStore = useTodoListStore(id, items);

    return (
        <div className="border-2">
            <div className="text-center p-2 font-semibold border-b-2">
                {title}
            </div>

            {todoLitStore.items.map((todoItem) => {
                return (
                    <TodoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        className="border-b-2"
                    />
                );
            })}

            <AddForm store={todoLitStore} />
        </div>
    );
}

export const TodoList: React.FC<Props> = observer(TodoListComponent);
