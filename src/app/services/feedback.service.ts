import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular} from 'ngx-restangular';

import { Feedback, ContactType } from '../shared/feedback';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

  submitFeedback(feedBack: Feedback): Observable<Feedback>{
    
      return this.restangular.all('feedback').post(feedBack);
    
  }

}
