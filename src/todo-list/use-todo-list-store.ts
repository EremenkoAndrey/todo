import { useState } from 'react';

import { TodoListStore } from './todo-list.store';
import { useTodoListService } from './use-todo-list-service';

import type { ITodoItem } from '../todo-item';

export function useTodoListStore(id: string, items: Array<ITodoItem>) {
    const todoListService = useTodoListService();
    const [todoListStore] = useState(() => new TodoListStore(
        id,
        items,
        todoListService
    ));

    return todoListStore;
}
