import { useIndexedDbService } from '../core/indexed-db';

import { TodosService } from './todos.service';

let todosService: TodosService;

export function useTodosService() {
    const externalApi = useIndexedDbService();

    if (!todosService) {
        todosService = new TodosService(
            externalApi
        );
    }

    return todosService;
}

