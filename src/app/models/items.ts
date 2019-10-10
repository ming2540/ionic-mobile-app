import { Item } from './item';
import { Observable } from 'rxjs';

// export interface Items {
//     offset: number;
//     limit: number;
//     total?: number;
//     results: Observable<Item>[];
// };

// export type Items = Item[];

export interface Items {
    refresh?: boolean;
    results: Item[];
    total: number;
}