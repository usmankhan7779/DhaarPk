import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ActiveAdServices } from './active-ad.services';
;

import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-active-ad',
  templateUrl: './active-ad.component.html',
  styleUrls: ['./active-ad.component.css']
})
export class ActiveAdComponent implements OnInit {
  r: any;
  pageno: any;
  sub: any;
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;


  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


    if (isPlatformBrowser(this.platformId)){
      this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
      data => {
        this.ActiveProduct = data;
      });
    }

  }
  ngOnInit() {

    this.httpService.GetAllActiveproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
        console.log('active products are::::', this.ActiveProduct);
      });
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
    }
  }

  DisableProduct(CatName,Product_ID) {
    this.httpService.DisableProduct(CatName,Product_ID).subscribe()
    Swal.fire('You have been successfully disable this product.','','success');
    // this.httpService.GetAllActiveproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
    //   data => {
    //     this.ActiveProduct = data;
    //     console.log('active products are::::', this.ActiveProduct);
    //   });
  }


  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }

  }

}
