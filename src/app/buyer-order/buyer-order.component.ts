import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
 

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyer-order',
  templateUrl: './buyer-order.component.html',
  styleUrls: ['./buyer-order.component.css']
})
export class BuyerOrderComponent implements OnInit {

  r: any;
  pageno: any;
  sub: any;
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    this.httpService.GetallInvoiceIDByUser(localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct);
      });
    }
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    sessionStorage.clear();
    }
  }
}
