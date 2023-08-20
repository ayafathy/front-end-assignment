import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart, Router, RouteConfigLoadStart, RouteConfigLoadEnd
} from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './shared/error-handler.service';
import { SpinnerService } from './shared/spinner.service';
import {ConfigService} from './shared/config-service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `<mat-progress-bar  mode="query" *ngIf="(loading) || (spinnerService.visibility | async)"  mode="indeterminate">`+
            `</mat-progress-bar>`+
            `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  loading = false;
  showSpinner: boolean;
  config: any ;
  constructor( private configService: ConfigService , public spinnerService: SpinnerService,  
    private http: HttpClient, private router: Router, private errorService: ErrorHandlerService) {

    this.config = this.configService.readConfig();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }





  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });



  }


}

