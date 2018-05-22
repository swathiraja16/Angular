import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/Observable/of';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return observableOf(PROMOTIONS).delay(2000).toPromise();
    
  }

  getPromotion(id: number): Promise<Promotion> {
    return observableOf(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000).toPromise();
  
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return observableOf(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000).toPromise();

  }
}