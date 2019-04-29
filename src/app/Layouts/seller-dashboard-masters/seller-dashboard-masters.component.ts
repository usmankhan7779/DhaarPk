// import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
// import {isPlatformBrowser} from '@angular/common';
// import Swal.fire from 'sweetalert2';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
 

import Swal from "sweetalert2";
import { LoginService } from '../../log-in/log-in.services';
import { HomeService } from '../../home/home.services';
import { ActiveAdServices } from '../../active-ad/active-ad.services';
import { UploadItemService } from '../../file-uploads/upload-item-service';


@Component({
  selector: 'app-seller-dashboard-masters',
  templateUrl: './seller-dashboard-masters.component.html',
  styleUrls: ['./seller-dashboard-masters.component.scss']
})
export class SellerDashboardMastersComponent implements OnInit {

 
  ServerUrl =  'https://apis.dhaar.pk/';
  NewPostcheck = false ;
  ValueRec: Boolean = false;
  ActiveProduct: any = [];
  GetUSerDOne: any = [];
  offerLength: any;
  r:any;
  GetUSerOffer: any[] = [];
  USerName: any;
  storename: any;
  model: any = {};
  ProductOffer: any = [];
  user: any;
  Product: any;
  sessionstore: any;
  ProductID:any;
  CatName: any;
  filetoup: FileList;
  fileName: any;
  // constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: Http ,
              private Profile: LoginService,
              private HomeServics: HomeService,
              private _nav: Router,
              private httpService: ActiveAdServices,
              private itemUploadService: UploadItemService) {
  }


  // ngOnInit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     window.scrollTo(0, 0);
  //   }
  // }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
     this.getuserdetails();
 
      console.log('NewPost is:', localStorage.getItem('NewPost'));
      this.ProductID = localStorage.getItem('NewProduct');
      this.CatName = localStorage.getItem('NewCat');
      if (localStorage.getItem('NewPost') === 'Done') {
        this.NewPostcheck = true;
        localStorage.setItem('NewPost', null);
        localStorage.setItem('NewProduct', null);
        localStorage.setItem('NewCat', null);

      }

      window.scrollTo(0, 0);

      // this.Profile.GetStoreInformationByUserId().subscribe(
      //   data => {
      //     this.ActiveProduct = data;
      //     console.log(this.ActiveProduct,"get store infomation")
      //     //alert(this.ActiveProduct = data )
      //   //  if (this.ActiveProduct.length > 0) {
      //       localStorage.setItem('StoreName', this.ActiveProduct.StoreInfo[0].StoreName);
      //       this.HomeServics.GetallProductsOffersByStoreName(1, localStorage.getItem('StoreName')).subscribe(resSlidersData => {
      //         this.GetUSerOffer = resSlidersData;
      //         // this.offerLength = GetUSerOffer['results'].length;


      //       });
      //       this.storename = localStorage.getItem('StoreName');
      //     // }
      //     //  else {
      //     //   this._nav.navigate(['/login']);
      //     // }
      //   });
      // this.sessionstore = localStorage.getItem('StoreName');
      // console.log('storename is', this.sessionstore);
      // this.httpService.GetStoreOffers(this.sessionstore).subscribe(data => {
      //   this.ProductOffer = data;
      //   console.log('product offer is: ',this.ProductOffer);
      // });


    }
  }

  getuserdetails(){
    this.Profile.GetUSerdetailsByUserId().subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;
      this.ValueRec = true;
      // alert(this.GetUSerDOne.user)
  this.USerName= this.GetUSerDOne.Fname;
    });
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "30%";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


  handleFileInput(files: FileList) {
      this. filetoup = files;
      console.log('uploaded filetoup  ', this.filetoup);

      this.fileName= 'https://storage.dhaar.pk/UserPics/' + localStorage.getItem('UserID') + '/' + this.filetoup[0].name;
      console.log('File Name is:' ,this.fileName);
      this.uploadItemsToActivity();

  }

  uploadItemsToActivity() {
      console.log('I am in 1 Component');
      this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        data => {
          this.Profile.UserDetailsUpdatePic(this.GetUSerDOne.user,this.fileName).subscribe();
          
          console.log('Successs')
        },
        error => {
          console.log(error);
        });
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
