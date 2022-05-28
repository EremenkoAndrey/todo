import { useState } from 'react';

import { TodoItemStore } from './todo-item.store';

import { useTodoItemService } from './use-todo-item-service';

import type { TodoItemProps } from './types';

export function useTodoItemStore(todoItem: TodoItemProps) {
    const todoItemService = useTodoItemService();

    const [todoItemStore] = useState(() => new TodoItemStore(
        todoItem,
        todoItemService
    ));

    return todoItemStore;
}
