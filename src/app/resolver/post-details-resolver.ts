import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryService } from '../shared/repository.service';
import { ServiceUrl } from '../shared/serviceurl';

@Injectable()
export class PostDetailsResolver implements Resolve<Observable<any>> {

  constructor(private repository: RepositoryService, private serviceUrl: ServiceUrl) { }

  resolve(route: ActivatedRouteSnapshot ) {
    const apiUrl = this.serviceUrl.posts + '/'+ route.paramMap.get('id');
    return this.repository.getData(apiUrl);
  }

}



