import React from 'react';
import { observer } from 'mobx-react';

import { TodoItem } from './TodoItem';
import { useTodoStore } from './use-todo-store';
import { ButtonStyled } from './styles';
import { ADD } from './dictionary';

type Props = {
    title: string;
}

export function TodoComponent(props: Props) {
    const todoStore = useTodoStore();

    const addTodo = () => todoStore.addTodo();

    return (
        <div className="max-w-xs">
            {props.title}
            <ul className="divide-y-2">
                {todoStore.itemStores.map(todoItemStore => (
                    <li className="py-1" key={todoItemStore.id}>
                        <TodoItem
                            content={todoItemStore.text}
                            onClick={() => todoItemStore.setContentEditable(true)}
                            onBlur={() => todoItemStore.setContentEditable(false)}
                            onTextChange={(text: string) => todoItemStore.setText(text)}
                            contentEditable={todoItemStore.contentEditable}
                        />
                    </li>
                ))}
            </ul>
            <div className="flex justify-center py-2">
                <ButtonStyled onClick={addTodo}>{ADD}</ButtonStyled>
            </div>
        </div>
    );
}

export const Todo: React.FC<Props> = observer(TodoComponent);
