import { useIndexedDbService } from '../core/indexed-db';

import { TodoItemService } from './todo-item.service';

let todoItemService: TodoItemService;

export function useTodoItemService() {
    const externalApi = useIndexedDbService();

    if (!todoItemService) {
        todoItemService = new TodoItemService(
            externalApi
        );
    }

    return todoItemService;
}

