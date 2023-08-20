import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RepositoryService } from '../../../shared/repository.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { Messages } from '../../../shared/Messages';
import { OpenMessageDialogService } from '../../../shared/open-message-dialog.service';
import { ServiceUrl } from '../../../shared/serviceurl';

import { map } from 'rxjs/operators';
import { PostModel } from '../post-model/post-model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public postForm: FormGroup;
  private dialogConfig;
  post: PostModel;
 

  constructor(private route: ActivatedRoute, private location: Location, private repository: RepositoryService,
    private dialog: MatDialog, private errorService: ErrorHandlerService, private formBuilder: FormBuilder,
    private router: Router, private messages: Messages, private serviceUrl: ServiceUrl,
    private openMessageDialogService: OpenMessageDialogService) {

    this.postForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      body: ['', [Validators.required]] ,
      title: ['', [Validators.required]] ,
      userId: ['', [Validators.required]]
    });


  }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
    this.fillForm();
    this.dialogConfig = {
      disableClose: true,
      width: '20%',
      data: {}
    };
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

  
  public editPost = (postForm) => {
    if (this.postForm.valid) {
      this.post = this.prepeareAreaDto(postForm);
      let apiUrl = this.serviceUrl.posts+'/'+this.post.id;
      this.repository.update(apiUrl, this.post).subscribe(
        res => {
          if (res ) {
            
            this.openMessageDialogService.openMessageDialogWithLocation(this.messages.updatePost, this.location);
          }
          else if(res['responseCode'] != 200) {
     
            this.openMessageDialogService.openMessageDialog(this.messages.error);
          }
        }
        ,
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);

        }));

    }

  }

  prepeareAreaDto(postFormValue) {
    const post: PostModel = {
      id: this.post.id,
      title: postFormValue.title ,
      body: postFormValue.body,
    userId :postFormValue.userId
    };
    return post;
  }

}
