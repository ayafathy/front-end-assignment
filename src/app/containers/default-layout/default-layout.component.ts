import {Component, OnInit, ViewChild} from '@angular/core';
import { INavData, navItems } from '../../_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItem: INavData[];
  
  userName:string;
  constructor(
   
   ) {
     
  }
 
  year: any;
 
  ngOnInit() {
  
   
this.navItem = navItems ;
 

   let currentTime = new Date()
   this.year = currentTime.getFullYear();
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  toggle = [];

}

