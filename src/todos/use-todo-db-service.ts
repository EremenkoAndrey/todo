import { TodoDbService } from './todo-db.service';

let todoDbService: TodoDbService;

export function useTodoDbService() {
    if (!todoDbService) {
        todoDbService = new TodoDbService();
    }
    return todoDbService;
}
