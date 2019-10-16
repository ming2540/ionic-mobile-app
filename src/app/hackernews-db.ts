import { InjectionToken } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


export const HACKER_NEWS_DB = new InjectionToken<AngularFireDatabase>('Hacker News db');