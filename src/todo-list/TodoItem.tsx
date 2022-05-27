import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { TODO_ITEM_PLACEHOLDER } from './dictionary';
import { ITodoItem } from './types';

type Props = {
    id: string;
    text: string;
    done: boolean;
    onChanged: (todoItem: Omit<ITodoItem, 'parentId'>) => void;
    className?: string;
}

export function TodoItemComponent(props: Props) {
    const {
        className,
        onChanged,
        ...todoItem
    } = props;
    const [contentEditable, setContentEditable] = useState(false);
    const isBlanc = !todoItem.id;
    const defaultTextValue = !isBlanc ? todoItem.text.trim() : '';
    const [text, setText] = useState<string>(defaultTextValue);
    const [done, setDone] = useState<boolean>(todoItem.done);
    const textareaRef = useRef<HTMLInputElement>(null);
    const startEditing = () => {
        setContentEditable(true);
    };
    const stopEditing = () => {
        setContentEditable(false);
        onChanged({
            id: todoItem.id,
            text,
            done
        });
        setText(defaultTextValue);
    };
    const updateTodoStatus = (status: boolean) => {
        onChanged({
            id: todoItem.id,
            text,
            done: status
        });
        setDone(status);
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
        if (contentEditable) {
            textareaRef.current.focus();
        }
    }, [contentEditable]);

    return (
        <div className={['flex py-2', className].join(' ')}>
            {contentEditable ? (
                <input
                    type="text"
                    onBlur={stopEditing}
                    className="w-full px-2 py-0.5"
                    onKeyDown={onEnterKeyPress}
                    ref={textareaRef}
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
            ) : (
                <>
                    <div className="flex items-center px-2">
                        {!isBlanc && (
                            <input
                                type="checkbox"
                                checked={done}
                                onChange={event => updateTodoStatus(event.target.checked)}
                            />
                        )}
                    </div>
                    <div
                        className="flex items-center px-2 w-full"
                        onClick={startEditing}
                    >
                        {isBlanc ? TODO_ITEM_PLACEHOLDER : text}
                    </div>
                </>
            )}
        </div>
    );
}

export const TodoItem: React.FC<Props> = observer(TodoItemComponent);
