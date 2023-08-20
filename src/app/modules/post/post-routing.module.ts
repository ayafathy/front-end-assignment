import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { PostLstComponent } from './post-lst/post-lst.component';
import { PostsResolver } from '../../resolver/post-resolver';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailsResolver } from '../../resolver/post-details-resolver';
import { ViewPostComponent } from './view-post/view-post.component';
import { PostCommentsDetailsResolver } from '../../resolver/post-comments-details-resolver';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'posts'
    },
    children: [
      {
        path: '',
        redirectTo: 'posts'
      },
      {
        path: 'posts',
        component: PostLstComponent,
        resolve: { posts: PostsResolver },
        data: {
          title: 'posts',
        },
     
        
      } 
      ,
      {
        path: 'update/:id',
        component: EditPostComponent,
        resolve: { post: PostDetailsResolver },
        data: {
          title: 'Edit post',
     
        },
     
      }
      //ViewPostComponent
      ,
      {
        path: 'view/:id',
        component: ViewPostComponent,
        resolve: { post: PostDetailsResolver  ,comments :PostCommentsDetailsResolver},
        data: {
          title: 'post details',
     
        },
     
      }
      
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class PostRoutingModule { }
