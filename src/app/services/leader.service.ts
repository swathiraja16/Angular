import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService} from './process-httpmsg.service';


import { Observable } from 'rxjs/observable';

import { of as observableOf } from 'rxjs/observable/of';

import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.restangular.all('leaders').getList();
    
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();

  }

  getFeaturedLeader(): Observable<Leader>{
    return this.restangular.all('leaders').getList({featured: true}).map(leaders=>leaders[0]);
    
  }
}
