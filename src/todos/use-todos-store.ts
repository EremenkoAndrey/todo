import { useState } from 'react';

import { TodosStore } from './todos.store';
import { useTodosService } from './use-todos-service';

export function useTodosStore() {
    const todosService = useTodosService();

    const [todosStore] = useState(() => new TodosStore(
        todosService
    ));

    return todosStore;
}

