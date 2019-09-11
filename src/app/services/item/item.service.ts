import { Injectable } from '@angular/core';
import { Observable, combineLatest, Subject, merge } from 'rxjs';
import { Items } from 'src/app/models/items';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchAll, skip, filter, take, withLatestFrom } from 'rxjs/operators';
import * as isEqual from 'lodash.isequal';
import { Item } from 'src/app/models/item';

export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private queries: Subject<Query>;

  constructor(private db: AngularFireDatabase) { 
    this.queries = new Subject<Query>();
  }
  
  load(query: Query) {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    const rawItemIds = this.db.list<number>('/v0/topstories')
      .valueChanges();
    const itemIds = combineLatest(
      rawItemIds,
      this.queries
    ).pipe(
      filter(([ids, query]) => query.refresh),
      map(([ids, query]) => ids)
    );
    const selector = ({offset, limit}, ids) => 
      combineLatest(...(ids.slice(offset, offset + limit)
        .map(id => this.db.object<Item>('/v0/item/' + id)
        .valueChanges()))
      ) as Observable<Items>;
    
    return merge(
      combineLatest(this.queries, itemIds).pipe(
        map(([query, ids]) => selector(query, ids).
        pipe(take(1)))
      ),
      this.queries.pipe(
        skip(1),
        withLatestFrom(itemIds, selector)
      )
    ).pipe(switchAll());
  }
  // load(offset: number, limit: number): Observable<Items> {
  //   return this.db.list('/v0/topstories')
  //     .valueChanges()
  //     .pipe(
  //       map(ids => ids.slice(offset, offset + limit)),
  //       distinctUntilChanged(isEqual),
  //       map((ids: any[]) => ids.map(id => this.db.object('/v0/item/' + id).valueChanges())),
  //       map((items: any) => ({
  //         offset,
  //         limit,
  //         total: limit,
  //         results: items,
  //       }))
  //     );
  // }
  // load(offset: number, limit: number): Observable<Items> {
  //   return this.db.list('/v0/topstories')
  //     .valueChanges()
  //     .pipe(
  //       map(ids => ids.slice(offset, offset + limit)),
  //       mergeMap((ids: any[]) => combineLatest(...(ids.map
  //         (id => this.db.object('/v0/item/' + id).valueChanges())))),
  //       map((items: any) => ({
  //          offset,
  //          limit,
  //          total: limit,
  //          results: items,
  //       }))
  //     );
  // }

}
