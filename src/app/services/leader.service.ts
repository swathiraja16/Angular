import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/observable';

import { of as observableOf } from 'rxjs/observable/of';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return observableOf(LEADERS).delay(2000);
    
  }

  getLeader(id: number): Observable<Leader> {
    return observableOf(LEADERS.filter((leader)=>(leader.id===id))[0]).delay(2000);

  }

  getFeaturedLeader(): Observable<Leader>{
    return observableOf(LEADERS.filter((leader)=>leader.featured)[0]).delay(2000);
    
  }
}
