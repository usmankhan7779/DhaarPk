import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import { LoginService } from '../log-in/log-in.services';
import { HomeService } from '../home/home.services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import {ActiveAdServices} from "../active-ad/active-ad.services";
import Swal from "sweetalert2";
import {UploadItemService} from '../file-uploads/upload-item-service';
import { SharedData } from '../shared-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
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
  CartedProduct: any = [];
  total: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: Http ,
              private Profile: LoginService,
              private HomeServics: HomeService,
              private _nav: Router,
              public _shareData: SharedData,
              private httpService: ActiveAdServices,
              private itemUploadService: UploadItemService) {
  }

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

      // this.HomeServics.GetAllProductcart().subscribe(resSlidersData => {

      //   this.CartedProduct = resSlidersData;
      //   console.log(this.CartedProduct.Results, 'cart')
      //   this.total = this.CartedProduct['Total Result']
      //   this._shareData.watchtotal(this.total);

      //   // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      
      // });
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

  AcceptOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.acceptOffer(this.user,this.Product).subscribe( data => {
      Swal.fire('This Offer has been Accepted', '', 'success')
    });
  }

  RejectOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.rejectOffer(this.user,this.Product).subscribe( data => {
      Swal.fire('This Offer has been Rejected', '', 'success')
    });
  }

  CounterOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
  }
  UpdateCounterOffer() {
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

      this.httpService.SellerCounterOffers(this.user,this.Product,this.model).subscribe((response) => {
          /* this function is executed every time there's a new output */
          // console.log("VALUE RECEIVED: "+response);
          // alert('inserted');
          Swal.fire('Your offer has been Updated. Please wait for the seller to respond.','','success');
        },
        (err) => {
          //erro
        },
        () => {
          /* this function is executed when the observable ends (completes) its stream */
          //   console.log("COMPLETED");
        }
      );
    } else {
      Swal.fire('Please Enter both Fields, Quantiy and Price per Quantity','','error');

    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
