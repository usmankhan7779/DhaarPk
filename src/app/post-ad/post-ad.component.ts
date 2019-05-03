import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

import { AdService } from './ad.services';
import {LoginService} from '../log-in/log-in.services';
import {HomeService} from '../home/home.services';
import {and} from '@angular/router/src/utils/collection';
import {UploadItemService} from '../file-uploads/upload-item-service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  _nav: any;
i;
  private sub: any;
  model: any = {"AddBestOffer":false};
  store:any;
  subcatNsubScat: any = [];
  GetAllSubSubCat: any = [];
  PictureData: any = [];
  DateTime: string;
  public GetAllSubCat: any = [];
  name: any;
  page: number;
  CatId: string;
  User_ID: string;
  StoreName: string;
  StoreNamess;
  Vendor= false;
  CatName: string;
  SubCat_ID: string;
  arrayIndex = 0;
  uploadFile: any;
  Buyitnow = false;
  CatNumber: number;
  ReservePrice = false;
  PictureCheck = false;
  MaxPictureCheck = false;
  ShowPictureError = false;
  Waitcall = false;
  ActiveProduct: any = [];
  GetUSerOffer: any[] = [];
  SessionstoreName: any;
  ReversePrice = false;
  private base64textString= '';
  private base64textString1= '';
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  ALLbase64textStringforPic= {0: 'dfghjk'};
  Addbestoffer = false;
  Auction = true;
  file: any;
  file1: any;
  files: FileList;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  filetoup:any=[];
  fileName = '';
  ImgSrc: any = [];
  fileList: any = [];
  url: any=[];
  PicCounter: any =0;
  fileCounter = 0;
  filetoup1:any=[];
  product_ad_active ="False";
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private HomeServics: HomeService,
    private Profile: LoginService,
    private route: ActivatedRoute,
    private PostAdd: AdService,

    private itemUploadService: UploadItemService,
    private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.CatName = params['CatName'] || '0' ;
        this.CatId  = params['CatId'] || '0';
        this.User_ID  = localStorage.getItem('UserID');
        // console.log('this.User_ID is',this.User_ID);


      });
      if (this.CatName === '0') {
        this.router.navigate(['/login']);
      }



    this.PostAdd.GetAllSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => this.GetAllSubCat = resSlidersData);
      console.log(this.GetAllSubCat);
this.vendors();
    this.PostAdd.GetAllSubSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => this.GetAllSubSubCat = resSlidersData);

    this.Profile.GetStoreInformationByUserId().subscribe(
      data => {
        this.ActiveProduct = data;
        console.log(this.ActiveProduct,"get store information ")
        if (this.ActiveProduct ) {
          this.StoreNamess =data;
          console.log(this.StoreNamess)
          localStorage.setItem('StoreName', this.ActiveProduct.StoreInfo[0].StoreName);
          // localStorage.setItem('StoreName', this.ActiveProduct[0].StoreName);
          this.HomeServics.GetallProductsOffersByStoreName(1, localStorage.getItem('StoreName') ).subscribe(resSlidersData => {
            this.GetUSerOffer = resSlidersData;


          });
          // this.SessionstoreName = localStorage.getItem('StoreName');
        } else {
          this.router.navigate(['/store-registration']);
        }
      });

  }
  }
  routetopostad(){
    if (localStorage.getItem('Vendor') == 'true'){
      this.router.navigate(['/select-categoryss']);}
      else if (localStorage.getItem('Vendor') == 'false'){
        this.router.navigate(['/select-categorys']);
      }
  }
  vendors(){
     if(localStorage.getItem('Vendor') === 'true')
    {
      this.Vendor = true;
    }
    
  }
  storess(){
    // alert  (this.model.StoreName)
    this.SessionstoreName= this.model.StoreName
    // alert(this.SessionstoreName)
    console.log(this.SessionstoreName)
  }

  EnableAuction() {

    if ( this.Auction === false ) {
     // console.log('ture');
      this.Auction = true;
    }

  }

  EnableFixd() {

    if ( this.Auction === true ) {
      // console.log('ture');
      this.Auction = false;
    }

  }

  
  BuyitnowFun() {

    if ( this.Buyitnow === true ) {
      //console.log('ture')
      this.Buyitnow = false;
    } else {
     // console.log('false')
      this.Buyitnow = true;
    }
  }

  AddbestofferFun() {
    if ( this.Addbestoffer === true ) {
          this.Addbestoffer = false;
    } else {
      this.Addbestoffer = true;
    }
  }



  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }

  // BuyitnowFun() {
  //
  //    if ( this.Buyitnow is equal(false) ){
  //      this.Buyitnow = true;
  //    }
  //    else {
  //      this.Buyitnow = false;
  //    }
  //
  // }


  checked3(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.product_ad_active = "True";
        console.log(this.product_ad_active,'true fbr register')
        // alert(this.product_ad_active)
        //this.setPage(1);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.product_ad_active="False";
        console.log(this.product_ad_active,'false fbr register')
        // alert(this.product_ad_active)
        //this.setPage(1);
    }
    //console.log(this.months3)
  }
  save( cateogry: any, condition: string) {
    // alert('first')
    this.ShowPictureError = false;
    if (this.PictureCheck) {


      const utcDate = new Date(new Date().getTime());
      const dateformat = utcDate.toString().split(' ');
      const timeNOw = dateformat[4].split(':');
      const Monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthind = Monthlist.indexOf(dateformat[1]);
      const monthindex = monthind + 1;
      console.log('month' + monthindex);
      this.DateTime = monthindex + dateformat[2] + dateformat[3] + timeNOw[0] + timeNOw[1] + timeNOw[2];
      console.log('month' + this.DateTime);
      const subcat = this.model.subcat.split('!');
      console.log('SubCat issss:', subcat);

      this.CatNumber = +this.CatId;
      console.log('CatNumber value is', this.CatNumber);

      if (this.CatNumber < 10) {

        this.CatId = '0' + this.CatId;
      }
       this.Waitcall = true;
      const Product_ID = this.CatId + subcat[1] + subcat[3] + this.DateTime;
      // console.log('var132:' + Product_ID );
      //   alert('before');
      //   alert(this.CatName);
      this.uploadItemsToActivity(this.SessionstoreName,Product_ID);
      const baseurl = 'https://storage.dhaar.pk/';
      for (let i=0;i<this.filetoup.length;i++) {
        if (i ===0){
          this.fileName = baseurl + this.SessionstoreName + '/' +Product_ID+'/'+ this.filetoup[i].name;
        } else {
          this.fileName += ',' + baseurl + this.SessionstoreName + '/' +Product_ID+'/'+ this.filetoup[i].name;
        }
        //alert( this.fileName);
      }
      console.log('File Name is:', this.fileName);
      if (this.Auction === true) {
        // alert('dasdasd');
        this.model.FixedPrice = 0;
        this.model.AddBestOffer = false;
        this.model.Quantity = 1;
        if (this.model.ReservePrice == null) {
          this.model.ReservePrice = 0;
        }
        if (this.model.Buyitnow == null) {
          this.model.Buyitnow = 0;
        }


          console.log('ABC');

          //  console.log('Phones & Tablets')
        console.log('Attributes:', Product_ID,this.User_ID, this.fileName, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer,this.model.StoreName, this.model.Quantity,this.model.StartbidTime,this.model.EndbidTime)
          this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID, localStorage.getItem('UserID'), this.fileName, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer,this.model.StoreName, this.model.Quantity,this.model.StartbidTime,this.model.EndbidTime,this.product_ad_active).subscribe();

      } else {


        this.model.Starting_Price = 0;
        this.model.Buyitnow = 0;
        this.model.ReservePrice = 0;
        this.model.AuctionListing = 0;

        // if (this.model.AddBestOffer == null) {
        //   this.model.AddBestOffer = 0;
        // }
        // console.log('catName:'+ this.CatName);


          this.PostAdd.Add_PhoneAndTabletProduct_Product(Product_ID,localStorage.getItem('UserID'),this.fileName, this.model.Title, this.CatName, subcat[0], subcat[2], this.model.condition, this.model.Addetail, this.Auction, this.model.Starting_Price, this.model.Buyitnow, this.model.ReservePrice, this.model.AuctionListing, this.model.FixedPrice, this.model.AddBestOffer,this.model.StoreName, this.model.Quantity,this.model.StartbidTime,this.model.EndbidTime,this.product_ad_active).subscribe();

      }
    } else {
      this.ShowPictureError = true;
      

    }

   // console.log(day);

  //  this.PostAdd.Fixed_Product(this.base64textString, cateogry, this.model.Title, this.model.P_Des, condition, this.CatName, '', cateogry, this.model.Price, day, P_auction).subscribe();

  }


  // handleUpload(data): void {
  //   if (data && data.response) {
  //     data = JSON.parse(data.response);
  //     this.uploadFile = data;
  //   }
  // }
  //
  // beforeUpload(uploadingFile): void {
  //   if (uploadingFile.size > this.sizeLimit) {
  //     uploadingFile.setAbort();
  //     alert('File is too large');
  //   }
  // }
  //
  //
  //
  // _handleReaderLoaded(readerEvt) {
  //   const binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //
  // }

  // onChange(event: EventTarget) {
  //
  //
  //
  //     const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
  //     const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
  //     this.files = target.files;
  //   if (this.files.length >= 1 && this.files.length < 5) {
  //
  //     this.MaxPictureCheck = false;
  //     this.file = this.files[0];
  //
  //     this.PictureCheck = true;
  //     const reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(this.file);
  //
  //     if (this.files.length > 1 && this.files.length < 5) {
  //
  //       for (let a = 1; a < (this.files.length); a++) {
  //         // alert(a);
  //         this.file1 = this.files[a];
  //         const reader1 = new FileReader();
  //         reader1.onload = (e: any) => {
  //           this._handleReaderLoadedforALl(e, a - 1);
  //         };
  //         // this._handleReaderLoadedforALl.bind(this.file1, a-1);
  //         reader1.readAsBinaryString(this.file1);
  //       }
  //       // console.log("fsdfsdf");
  //       console.log(this.ALLbase64textStringforPic);
  //     }
  //   }else {
  //     this.MaxPictureCheck = true;
  //   }
  //
  //
  //  }


  // _handleReaderLoadedforALl(readerEvt, index) {
  //   // console.log('attt  ',index);
  //   const binaryString = readerEvt.target.result;
  //   // console.log('123456');
  //   // console.log('asdfghjk   ',btoa(binaryString))
  //   // // this.arrayIndex=0;
  //
  //   this.ALLbase64textStringforPic[index] = btoa(binaryString);
  //   // console.log(this.ALLbase64textStringforPic);
  //   this.arrayIndex += 1;
  //
  //
  // }

  // onRemove(file: FileHolder) {
  //   console.log('Removed file is:', file.file);
  //   // for(let i=0;i<this.filetoup.length;i++) {
  //     console.log('Removed file is:', this.filetoup);
  //   // }
  // }

  // handleFileInput1(files: FileList) {
  //   this.PictureCheck=true;
  //   this.filetoup = files;
  //   console.log('thisssssssssssss', this.filetoup);
  // }

  // handleFileInput1(files: FileList) {
  //   this.PictureCheck = true;
  //   this.filetoup.push(files.item(0));
  //   console.log('Files are:yessss', this.filetoup);
  // }
  // handleFileInput2(files: FileList) {
  //
  //   this.filetoup.push(files.item(0));
  //   console.log('Files are:', this.filetoup);
  // }
  // handleFileInput3(files: FileList) {
  //
  //   this.filetoup.push(files.item(0));
  //   console.log('Files are:', this.filetoup);
  // }

  // handleFileInput(files: FileList) {
  //   if (files.length>3){
  //     Swal.fire('You can upload maximum 2 images','','error')
  //   } else {
  //     this.PictureCheck=true;
  //     this.filetoup = files;
  //     console.log('Files are:', this.filetoup);
  //   }
  // }
  removepic(image:File) {
    console.log('image isss:', image);
    this.filetoup.splice(image,1);
    this.url.splice(image,1);
    this.PicCounter -=1;
    console.log('filetoup after remove:', this.filetoup);
  }
  

  onChange(event:FileList) {

    this.PicCounter +=event.length;

    console.log('PicCounter is', this.PicCounter);

    if (event.length <=5 && this.PicCounter <= 5) {
      this.PictureCheck = true;
      console.log('Event', event);
      for (let i = 0; i < event.length; i++) {
        if (event) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            console.log('Inner event', event);
            this.url.push(event.target.result);
          };
          reader.readAsDataURL(event[i]);
        }
      }
      this.filetoup1 = event;
      for (let itm of this.filetoup1) {
        this.filetoup.push(itm);
      }
      console.log('Filetoup has:', this.filetoup);
    } else {
      Swal.fire('Maximum 5 Pictures are allow','','error');
      this.PicCounter -= event.length;
    }

    console.log('PicCounter at end is', this.PicCounter);

  }

  uploadItemsToActivity(StoreName,ProductID) {
    // if (this.filetoup.length === 1) {
    console.log('I am in 1 Component');
    this.itemUploadService.PostImage(this.filetoup, StoreName, ProductID).subscribe(
      data => {
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
  }
}


