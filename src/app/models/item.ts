export interface Item {
    id: number;
    title: string;
    url: string;
    by: string;
    time: number;
    score: number;
    text?: string;
    descendants?: number;
    kids?: number[];
}