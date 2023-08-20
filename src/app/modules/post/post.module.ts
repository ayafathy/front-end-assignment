import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { FlexModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PostLstComponent } from './post-lst/post-lst.component';
import { PostRoutingModule } from './post-routing.module';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ViewPostComponent } from './view-post/view-post.component';



@NgModule({
  declarations: [PostLstComponent, EditPostComponent, ViewPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule ,
    ReactiveFormsModule,
    MatDividerModule,
    FlexModule,
    SharedModule,
    MaterialFileInputModule
  ]
})
export class PostModule { }
