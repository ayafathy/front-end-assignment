import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceUrl {
  
  public posts: string = 'posts';
  public postComments: string = 'comments?postId=';

}

