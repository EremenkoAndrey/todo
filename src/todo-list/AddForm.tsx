import React, { useState } from 'react';

import { TODO_ITEM_PLACEHOLDER } from './dictionary';

interface Store {
    addItem: (text: string) => Promise<void>;
}
type Props = {
    store: Store;
}

export function AddForm(props: Props) {
    const [text, setText] = useState('');

    const addItem = async () => {
        await props.store.addItem(text);
        setText('');
    };

    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            return addItem();
        }
    };

    return (
        <div className="py-2">
            <input
                type="text"
                className="w-full px-2 py-0.5"
                onBlur={addItem}
                onKeyDown={onEnterKeyPress}
                value={text}
                onChange={event => setText(event.target.value)}
                placeholder={TODO_ITEM_PLACEHOLDER}
            />
        </div>
    );
}
