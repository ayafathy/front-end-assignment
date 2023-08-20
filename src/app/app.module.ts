import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule, APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';


// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ErrorDialogComponent } from './shared/dialogs/error-dialog/error-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerService } from './shared/spinner.service';


import { MessageDialogComponent } from './shared/dialogs/message-dialog/message-dialog.component';


import { SharedModule } from './shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigService } from './shared/config-service';

import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';



import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingDialogComponent } from './shared/dialogs/loading-dialog/loading-dialog.component';

import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PostsResolver } from './resolver/post-resolver';
import { PostDetailsResolver } from './resolver/post-details-resolver';
import { PostCommentsDetailsResolver } from './resolver/post-comments-details-resolver';





const appInitializerFn = (configService: ConfigService) => {
  return () => {
    return configService.loadInfo();
  };
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDividerModule,
    FlexModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN' }),
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    MaterialModule,
    MatSelectModule,
    MatSelectFilterModule,
    HttpClientModule,


    FormsModule,

    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    P404Component,
    P500Component,
    MessageDialogComponent,
    ErrorDialogComponent,
  ],
  providers: [

    PostsResolver,

    PostDetailsResolver ,
    PostCommentsDetailsResolver ,
    SpinnerService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },

    { provide: APP_BASE_HREF, useValue: '/posts' },


 
  ],
  bootstrap: [AppComponent]
  , entryComponents: [
    ErrorDialogComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    LoadingDialogComponent
  ]

})
export class AppModule { }
