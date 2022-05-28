import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { TodoItemProps } from './types';
import { useTodoItemStore } from './user-todo-item-store';

type Props = {
    todoItem: TodoItemProps
    className?: string;
}

export function TodoItemComponent(props: Props) {
    const {
        className,
        todoItem
    } = props;
    const store = useTodoItemStore(todoItem);
    const textareaRef = useRef<HTMLInputElement>(null);
    const startEditing = () => {
        store.setContentEditable(true);
    };
    const stopEditing = () => {
        store.setContentEditable(false);
        store.updateItem();
    };

    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            stopEditing();
        }
    };

    useEffect(() => {
        if (!textareaRef.current) {
            return;
        }
        if (store.contentEditable) {
            textareaRef.current.focus();
        }
    }, [store.contentEditable]);

    return (
        <div className={['flex py-2', className].join(' ')}>
            {store.contentEditable ? (
                <input
                    type="text"
                    onBlur={stopEditing}
                    className="w-full px-2 py-0.5"
                    onKeyDown={onEnterKeyPress}
                    ref={textareaRef}
                    value={store.text}
                    onChange={event => store.setText(event.target.value)}
                />
            ) : (
                <>
                    <div className="flex items-center px-2">
                        <input
                            type="checkbox"
                            checked={store.done}
                            onChange={event => store.setDone(event.target.checked)}
                        />
                    </div>
                    <div
                        className="flex items-center px-2 w-full"
                        onClick={startEditing}
                    >
                        {store.text}
                    </div>
                </>
            )}
        </div>
    );
}

export const TodoItem: React.FC<Props> = observer(TodoItemComponent);
