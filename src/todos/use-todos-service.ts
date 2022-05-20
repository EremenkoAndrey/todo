import { useTodoDbService } from './use-todo-db-service';

import { TodosService } from './todos.service';

let todosService: TodosService;

export function useTodosService() {
    const remoteApi = useTodoDbService();

    if (!todosService) {
        todosService = new TodosService(
            remoteApi
        );
    }

    return todosService;
}

