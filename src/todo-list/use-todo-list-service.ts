import { useIndexedDbService } from '../core/indexed-db';

import { TodoListService } from './todo-list.service';

let todoListService: TodoListService;

export function useTodoListService() {
    const externalApi = useIndexedDbService();

    if (!todoListService) {
        todoListService = new TodoListService(
            externalApi
        );
    }

    return todoListService;
}

