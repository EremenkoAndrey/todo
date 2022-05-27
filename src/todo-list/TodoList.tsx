import React from 'react';
import { observer } from 'mobx-react';

import { useTodoLitStore } from './use-todo-lit-store';
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

    const addOrUpdate = (todoItem: ITodoItem) => {
        console.log('todoItem', id, todoItem)
        if (todoItem.id) {
            console.log('update')
            todoLitStore.updateItem(todoItem);
        } else {
            console.log('add')
            todoLitStore.addItem(todoItem);
        }
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
                        id={todoItem.id}
                        text={todoItem.text}
                        done={todoItem.done}
                        onChanged={(item: Omit<ITodoItem, 'parentId'>) => addOrUpdate({
                            ...item,
                            parentId: id
                        })}
                        className="border-b-2"
                    />
                );
            })}
        </div>
    );
}

export const TodoList: React.FC<Props> = observer(TodoListComponent);
