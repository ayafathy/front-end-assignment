import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PostModel } from '../post-model/post-model';
import { CommonModel } from '../post-model/comment-model';
import { MatTableDataSource } from '@angular/material/table';
;
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  public postForm: FormGroup;

  public displayedColumns = ['name', 'email','body'];
  public dataSource = new MatTableDataSource<CommonModel>();
  post: PostModel;
  constructor(private route: ActivatedRoute, private location: Location, 
    private formBuilder: FormBuilder,

  ) {
    
    this.postForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      body: ['', [Validators.required]] ,
      title: ['', [Validators.required]] ,
      userId: ['', [Validators.required]]
    });


  }

  ngOnInit() {
    console.log(this.route.snapshot.data.post) ;
    this.post = this.route.snapshot.data.post;
    let comments = this.route.snapshot.data.comments;
    console.log(comments ) ;
    this.dataSource.data = comments;
    this.fillForm();

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  fillForm() {
    if (this.post.id) {
      this.postForm.controls['id'].setValue(this.post.id);
    }
    if (this.post.title) {
    
      this.postForm.controls['title'].setValue(this.post.title);
    }
    if (this.post.body) {
    
      this.postForm.controls['body'].setValue(this.post.body);
    }
    if (this.post.userId) {
    
      this.postForm.controls['userId'].setValue(this.post.userId);
    }
  }


}
