import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';




@Injectable({
  providedIn: 'root'
})


export class OpenMessageDialogService {
  constructor(private router: Router, public dialog: MatDialog) { }

  public openMessageDialog = (message: string) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
    dialogRef.disableClose = true;

  }
  public openMessageDialogError = (message: string) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message, error: true },
    });
    dialogRef.disableClose = true;

  }

  public openMessageDialogeReLoad = (message: string, previousPass: string, currentPass: string) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if (previousPass != null && currentPass != null) {
        this.router.navigateByUrl(previousPass, { skipLocationChange: true }).then(() => {
          this.router.navigate([currentPass]);
        });
      }
      else{
        window.location.reload();
      }

    });
  }

  //after confirm return user to previous page
  public openMessageDialogWithLocation = (message: string, location: Location) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      location.back();
    });
  }
  public openErrorMessageDialogWithLocation = (message: string, location: Location) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message, error: true}
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      location.back();
    });
  }


  public openConfirmDialog = (message: string) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: message }
    });
    dialogRef.disableClose = true;
    return dialogRef;
  }

  public openMessageDialogwithURL = (message: string, url: string) => {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(url);
    });
  }

  public openLoadingDialog = () => {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      width: '350px',
    });
    dialogRef.disableClose = true;
    return dialogRef;
  }

}
