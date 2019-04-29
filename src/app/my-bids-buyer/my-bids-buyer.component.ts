import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveAdServices } from '../active-ad/active-ad.services';
 

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-bids-buyer',
  templateUrl: './my-bids-buyer.component.html',
  styleUrls: ['./my-bids-buyer.component.css']
})
export class MyBidsBuyerComponent implements OnInit {
  r: any;
  errormessage = false;
  errormessage1 = false;
  pageno: any;
  sub: any;
  modelNo: any;
  ActiveProduct: any = [];
  successbid: any = [];
  GetPhotos: any = [];
  CatName: any;
  unsusssbid:any=[];

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  // pageTrendChanged(event) {
  //   // alert("mobile")
  //   this.r = event;
  //   this.pageno = event;

  //   alert(this.pageno);
  //   this.httpService.GetAllActiveproductsBYUserID(this.pageno, localStorage.getItem('user_id')).subscribe(
  //     data => {
  //       this.ActiveProduct = data;
  //     });


  // }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){

    this.httpService.GetallProductdBids().subscribe(
      data => {
        this.ActiveProduct = data;
        console.log('bids products are:', this.ActiveProduct);
        if (this.ActiveProduct['totalItems'] === 0) {
          this.errormessage = true;
        }
      });
      this.Getsuccssful();
        this.Getunsuccssful();
    // this.httpService.GetSuccessfulBids(localStorage.getItem('UserID')).subscribe( data => {
    //   this.successbid = data;
    //   if (this.successbid['totalItems'] === 0) {
    //     this.errormessage1 = true;
    //   }
    // });
  }
  }
  
  Getsuccssful()
  {

    this.httpService.GetSuccessfulBids(true).subscribe( data => {
      this.successbid = data;
      if (this.successbid['totalItems'] === 0) {
        this.errormessage = true;
      }
    });
  }
  Getunsuccssful()
  {
    
    this.httpService.GetSuccessfulBids(false).subscribe( data => {
      this.unsusssbid = data;
      if (this.unsusssbid['totalItems'] === 0) {
        this.errormessage = true;
      }
    });
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
