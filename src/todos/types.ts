export interface ITodo {
    id: string,
    title: string;
    date: Date;
}

export type TodoSource = Omit<ITodo, 'id'>;
