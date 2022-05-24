import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { TODO_ITEM_PLACEHOLDER } from './dictionary';

type Props = {
    text: string;
    onContentChanged: (content: string) => void;
    className?: string;
}

export function TodoItemComponent(props: Props) {
    const { text, className, onContentChanged } = props;

    const [contentEditable, setContentEditable] = useState(false);
    const textareaRef = useRef<HTMLInputElement>(null);
    const content = text.length > 0 ? text.trim() : TODO_ITEM_PLACEHOLDER;

    const startEditing = () => {
        setContentEditable(true);
    };
    const stopEditing = () => {
        setContentEditable(false);
        if (textareaRef.current) {
            onContentChanged(textareaRef.current.value);
        }
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
                />
            ) : (
                <>
                    <div className="flex items-center px-2">
                        <input type="checkbox" />
                    </div>
                    <div
                        className="flex items-center px-2 w-full"
                        onClick={startEditing}
                    >
                        {content}
                    </div>
                </>
            )}
        </div>
    );
}

export const TodoItem: React.FC<Props> = observer(TodoItemComponent);
