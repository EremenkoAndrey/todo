export interface ITodo {
    id: string,
    title: string;
    date: Date;
}
export interface ITodoEntity {
    id?: number;
    title: string;
    timestamp: number;
}
export type TodoSource = Omit<ITodo, 'id'>;
