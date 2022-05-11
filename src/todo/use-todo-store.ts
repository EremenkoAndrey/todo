import { useState } from 'react';

import { TodoStore } from './todo.store';

export function useTodoStore() {
    const [todoStore] = useState(() => new TodoStore());

    return todoStore;
}
