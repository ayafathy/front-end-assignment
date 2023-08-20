import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { SpinnerService } from './spinner.service';
import {MessageDialogComponent} from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';
import { InputDialogComponent } from './dialogs/input-dialog/input-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialCharacterDirective } from './SpecialCharacterDirective';
import { TrimmingDirective } from './TrimmingDirective';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    SuccessDialogComponent,
    SpecialCharacterDirective,
    TrimmingDirective
  ],
  declarations: [SpecialCharacterDirective, TrimmingDirective,SuccessDialogComponent, ConfirmDialogComponent, LoadingDialogComponent, InputDialogComponent ],
  entryComponents: [
    SuccessDialogComponent ]
})
export class SharedModule { }
