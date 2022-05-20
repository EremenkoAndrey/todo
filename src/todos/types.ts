export interface TodoEntity {
    id?: number;
    title: string;
    timestamp: number;
}
export interface ITodo {
    id: string,
    title: string;
    date: Date;
}
export type TodoSource = Omit<ITodo, 'id'>;
