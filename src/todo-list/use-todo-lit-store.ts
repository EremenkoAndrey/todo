import { useState } from 'react';

import { TodoListStore } from './todo-list.store';
import { useTodoListService } from './use-todo-list-service';
import { ITodoItem } from './types';

export function useTodoLitStore(id: string, items: Array<ITodoItem>) {
    const todoListService = useTodoListService();

    const [todoListStore] = useState(() => new TodoListStore(
        id,
        items,
        todoListService
    ));

    return todoListStore;
}
