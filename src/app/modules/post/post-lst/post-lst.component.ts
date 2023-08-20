import { Component, OnInit, ViewChild } from '@angular/core';
import { PostModel } from '../post-model/post-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceUrl } from '../../../shared/serviceurl';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { RepositoryService } from '../../../shared/repository.service';

@Component({
  selector: 'app-post-lst',
  templateUrl: './post-lst.component.html',
  styleUrls: ['./post-lst.component.css']
})
export class PostLstComponent implements OnInit {

  selectedRowIndex: number;
  selectedArea :PostModel;
  public displayedColumns = ['id', 'userId','title'];
  public dataSource = new MatTableDataSource<PostModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute,
    private errorService: ErrorHandlerService, private repoService: RepositoryService,
    private serviceUrl: ServiceUrl) {
  
   
  }
   
  ngOnInit(): void {
    let post = this.route.snapshot.data.posts;
    console.log(post ) ;
   
    this.dataSource.data = post;
 
  }

  search(event?: PageEvent) {

    let pageindext = this.paginator.pageIndex;
    let pagesize = this.paginator.pageSize;

    let api = this.serviceUrl.posts +`?_start=${pageindext}&_limit=${pagesize}` ;
      this.repoService.getData(api)
        .subscribe(res => {
          if (res) {
            let content :PostModel [] = res as PostModel [] ;
            this.dataSource.data = content;
          }
        },
          (error) => {
            this.dataSource = null;
            this.errorService.handleError(error);
          });

    }

  






  highlight(row) {
    this.selectedRowIndex = row.id;
    this.selectedArea = row;
  }

  public redirectToView = () => {
    const url = `post/view/${this.selectedRowIndex}`;
    this.router.navigate([url]);
  }
  public redirectToedit = () => {

    const url = `post/update/${this.selectedRowIndex}`;
    this.router.navigate([url]);

  }

}
