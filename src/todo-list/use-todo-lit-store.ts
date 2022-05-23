import { useState } from 'react';

import { TodoListStore } from './todo-list.store';
import { useTodoListService } from './use-todo-list-service';

export function useTodoLitStore(parentId: string) {
    const todoListService = useTodoListService();

    const [todoListStore] = useState(() => new TodoListStore(
        parentId,
        todoListService
    ));

    return todoListStore;
}
