// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { ItemService } from '../services/item/item.service';
// import * as range from 'lodash.range';
// import { Items } from '../models/items';
// import { Item } from '../models/item';

// @Injectable()
// export class  ItemServiceMock extends ItemService{
//     load(offset?: number, limit?: number): Observable<Items> {
//         const results: Item[] = range(offset, offset + limit)
//             .map(index => ({
//                 id: index,
//                 title: `Item ${index +1}`,
//                 url: `http://www.example.com/item${index}`,
//                 by: `demo`,
//                 time: new Date().getTime() / 1000,
//                 score: index,
//             }));
        
//         return of({
//             offset,
//             limit,
//             total: offset + limit,
//             results,
//         });
//     }
// }