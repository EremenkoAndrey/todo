import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { TODO_ITEM_PLACEHOLDER } from './dictionary';

type Props = {
    text: string;
    contentEditable: boolean;
    onTextChange: (text: string) => void;
    onBlur: () => void;
    onClick: () => void;
}

export function TodoItemComponent(props: Props) {
    const {
        onClick,
        onBlur,
        onTextChange,
        text,
        contentEditable
    } = props;

    const textareaRef = useRef<HTMLInputElement>(null);
    const content = text.length > 0 ? text.trim() : TODO_ITEM_PLACEHOLDER;

    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlur();
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
        <div className="flex">
            {contentEditable ? (
                <input
                    type="text"
                    onChange={event => onTextChange(event.target.value)}
                    onBlur={onBlur}
                    value={content}
                    className="w-full px-2 py-0.5"
                    onKeyDown={onEnterKeyPress}
                    ref={textareaRef}
                />
            ) : (
                <>
                    <div className="flex items-center px-2">
                        <input type="checkbox" />
                    </div>
                    <div className="flex items-center px-2 w-full" onClick={onClick}>
                        {text}
                    </div>
                </>
            )}
        </div>
    );
}

export const TodoItem: React.FC<Props> = observer(TodoItemComponent);
