import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return observableOf(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return observableOf(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);

  }

  getFeaturedDish(): Observable<Dish> {
    return observableOf(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }

  getDishIds(): Observable<number[]>{
    return observableOf(DISHES.map(dish=>dish.id));
  }

}
