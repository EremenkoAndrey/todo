import React from 'react';
import { observer } from 'mobx-react';

import { Button } from '../core/shared';

import { ADD } from './dictionary';

type Props = {
    title: string;
}

export function TodoComponent(props: Props) {
    // const todoStore = useTodoStore();

    // const addTodo = () => todoStore.addTodo();
    console.log('props.title', props.title);
    return (
        <div className="max-w-xs">
            {props.title}
            {/*<ul className="divide-y-2">*/}
            {/*    {todoStore.itemStores.map(todoItemStore => (*/}
            {/*        <li className="py-1" key={todoItemStore.id}>*/}
            {/*            <TodoItem*/}
            {/*                content={todoItemStore.text}*/}
            {/*                onClick={() => todoItemStore.setContentEditable(true)}*/}
            {/*                onBlur={() => todoItemStore.setContentEditable(false)}*/}
            {/*                onTextChange={(text: string) => todoItemStore.setText(text)}*/}
            {/*                contentEditable={todoItemStore.contentEditable}*/}
            {/*            />*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <div className="flex justify-center py-2">
                <Button onClick={() => undefined}>{ADD}</Button>
            </div>
        </div>
    );
}

export const Todo: React.FC<Props> = observer(TodoComponent);
