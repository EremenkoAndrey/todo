import { IndexedDbService } from './indexed-db.service';

let todoDbService: IndexedDbService;

export function useIndexedDbService() {
    if (!todoDbService) {
        todoDbService = new IndexedDbService();
    }
    return todoDbService;
}
