import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ActiveAdServices } from '../active-ad/active-ad.services';
 

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-bidds',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {
  r: any;

  pageno: any;
  sub: any;

  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  successbid: any = [];
  unsusssbid:any=[];
  CatName: any;
  SessionstoreName: any;
  errormessagefirst = false;
  errormessage=false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,

               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }


               
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      // alert(localStorage.getItem('UserID'))
      this.SessionstoreName = localStorage.getItem('StoreName');
      this.httpService.GetallProductdBids().subscribe(
        data => {
          this.ActiveProduct = data.results;
          console.log(this.ActiveProduct)
          if (this.ActiveProduct['totalItems'] == 0) {
            this.errormessagefirst = true;
          }
        });
    
        this.Getsuccssful();
        this.Getunsuccssful();
  }
  }

  Getsuccssful()
  {

    this.httpService.GetSuccessfulBids(true).subscribe( Response => {
      this.successbid = Response.Data;
      if (this.successbid['totalItems'] == 0) {
        this.errormessage = true;
      }
    });
  }
  Getunsuccssful()
  {
    
    this.httpService.GetSuccessfulBids(false).subscribe( Response => {
      this.unsusssbid = Response.Data;

      
      // let demohomwprods;
      // demohomwprods = Response.Data;

      // for (let prods of Response.Data) {
        // console.log("Data: "+JSON.stringify(this.unsusssbid));
      //   this.unsusssbid.push(prods.results)
      //   // this.unsusssbid.push(prods.results);
      // }
      
      if (this.unsusssbid['totalItems'] == 0) {
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
