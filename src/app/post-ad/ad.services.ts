import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
// import { HttpClient } from 'selenium-webdriver/http';
import {HttpClient} from "@angular/common/http";



@Injectable()

export class AdService {

  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  ServerUrl = 'https://apis.dhaar.pk/products/';
  // ServerUrl = 'http://192.168.30.132:8000/products/';
  ServerUrlLocal = 'https://apis.dhaar.pk/products/';
  StoreUrl =  'https://apis.dhaar.pk/store/';
  serverpayment ='https://apis.dhaar.pk/payment/';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: Http,
              private httpclient:HttpClient,
              private _nav: Router) {

  }

  GetAllCategories() {

    return this._http.get(this.ServerUrl + 'Getallcat').map(response => response.json());
   
  }
  GetAllSubCategories() {

    return this._http.get(this.ServerUrl + 'Getallsubcat').map(response => response.json());
  }
  GetAllSubSubCategories() {

    return this._http.get(this.ServerUrl + 'Getallsubsubcat').map(response => response.json());
  }


  GetAllSubCategoriesByCatID(pk: string) {


    //console.log(pk);
    return this._http.get(this.ServerUrl + 'Getsubcat/' + pk).map(response => response.json());


    // //console.log(this.CateDeatils)
  }
  GetAllSubSubCategoriesByCatID(pk: string) {

      return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(response => response.json());
    // //console.log(this.CateDeatils)
  }
  GetAllSubSubCategoriesBySubCatID(pk: string) {

      return this._http.get(this.ServerUrl + 'GetsubsubcatBySubcat/' + pk).map(response => response.json());
    // //console.log(this.CateDeatils)
  }

  GetSubSubCategories(pk: string) {

    return this._http.get(this.ServerUrl + 'Getsubsubcat/' + pk).map(response => response.json());


    // //console.log(this.CateDeatils)
  }

  addpaymentmethod(cardNumber,ccv,expiry,card_type,nickname,check,country,province,city,cardholdername) {


    // //console.log(Pidd);


    return this.httpclient.post(this.serverpayment+'carddeatailpost_get/',
      {
        "cardNumber":cardNumber,
          "ccv":ccv,
          "expiry":expiry,
          "card_type":card_type,
          "nickname":nickname,
          "default":check,
          "country":country,
          "province":province,
          "city":city,
          "cardholdername":cardholdername     
      }
      ).map((res: Response) => {
      if (res) {
        //console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          //console.log('this is the id' + responce_data.id);
          // this.ProductImages(Pic, responce_data.id).subscribe();
          // localStorage.setItem('Authorization', res.json().token);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      //console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  Fixed_Product(Pic: any, Sub2_cat: any, title: any, User_ID: any, des: any, con: any, cat: any, sub_cat: any, Sub_Subcat: any, Price: any, Day: any, Auction: any ) {


    // //console.log(Pidd);


    return this._http.post('http://localhost:8000/AddNewProduct',
      {

        'Cat_Name': cat ,
        'Subcat_Name': sub_cat,
        'Sub_Subcat_Name': Sub_Subcat,
        'P_Title':  title,
        'P_Des':  des,
        'P_Condition':  con,
        'Price': Price,
        'AuctionDays': Day,
        'Auction': Auction,



        //    'Pidd':  Pidd,
      }).map((res: Response) => {
      if (res) {
        //console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          //console.log('this is the id' + responce_data.id);
          this.ProductImages(Pic, responce_data.id).subscribe();
          // localStorage.setItem('Authorization', res.json().token);

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      //console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }

  ProductImages( Pidd: any, ALLbase64textStringforPic) {
        return this._http.post(this.ServerUrl + 'productimages', {'Pic': ALLbase64textStringforPic, 'ProID': Pidd})
          .map((res: Response) => {
            if (res) {
              // //console.log('testing res');
              if (res.status === 200 || res.status === 201) {

                const responce_data = res.json();
                // //console.log('this isinsertion ' + responce_data.id);
                // this.UPload_PIc2(Sub2_cat, title, des, con, cat, sub_cat, Sub_Subcat, this.id).subscribe();
                //            localStorage.setItem('Authorization', res.json().token);
                //          this._nav.navigate(['/profile']);
                return [{status: res.status, json: res}];
              }
            }
          }).catch((error: any) => {
            //console.log('errors ');
            alert(error)
            return Observable.throw(new Error(error.status));
          });


  }

  Edit_PhoneAndTabletProduct_Product(model: any []) {
   
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    //// console.log('pofile', localStorage.getItem('Authorization'));
    headers.append('Content-Type', 'application/json');
    if (isPlatformBrowser(this.platformId)){

      return this._http.put(this.ServerUrl + 'productediting/' + model['ProductID'],
        {
          'Cat_Name': model['Cat_Name'] ,
          'Sub_Cat_Name': model['Sub_Cat_Name'],
          'Sub_Sub_Cat_Name': model['Sub_Sub_Cat_Name'],
          'P_Title':  model['P_Title'],
          'P_Des':  model['P_Des'],
          'P_Condition':  model['P_Condition'],
          'Auction': model['Auction'],
          'SrartingPrice': model['SrartingPrice'],
          'AuctionListing': model['AuctionListing'],
          'ReservePrice': model['ReservePrice'],
          'FixedPrice': model['FixedPrice'],
          'Addbestoffer': model['Addbestoffer'],
          'Quantity': model['Quantity'],
          'MaxQuantity': model['MaxQuantity'],
          'product_ad_active':model['product_ad_active'],
          'Active':model['Active'],

          'Pic':model['Pic'],
'StartbidTime':model['StartbidTime'],
'EndbidTime':model['EndbidTime'],
        }, { headers: headers }).map((res: Response) => {

      }).catch((error: any) => {
        //console.log(error.toString());
        return Observable.throw(new Error(error.status));
      });


    }
  }

  Add_PhoneAndTabletProduct_Product(Product_ID: any,    basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any,
     condition: any, Addetail: any, Auction: any, Starting_Price: any, Listing:any,
       ReservePrice: any, AuctionListing: any, FixedPrice: any,
      AddBestOffer: any,StoreName:any, Quantity: any,product_ad_active:any,AutoRelist:any,declineprice:any,atleastprcieaccept:any,
      DicountStatus:any,Discountprice:any, Discountpersentage:any,ListIndefinitly:any,ReserveStatus:any) {
  
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Content-Type', 'applicati on/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    //// console.log('pofile', localStorage.getItem('Authorization'));
    headers.append('Content-Type', 'application/json');
    if (isPlatformBrowser(this.platformId)){

    return this._http.post(this.ServerUrl + 'postAnAd',
      {
        'ProductID': Product_ID,
        'Cat_Name': CatName ,
        'Sub_Cat_Name': SubCat,
        
        'Sub_Sub_Cat_Name': SubSubCat,
        'P_Title':  Title,
        'P_Des':  Addetail,
        'P_Condition':  condition,
        'auction': Auction,
        'SrartingPrice': Starting_Price,
        'MaxBidPrice': Starting_Price,
       'Listing':Listing,
        'AuctionListing': AuctionListing,
        'ReservePrice': ReservePrice,
        'FixedPrice': FixedPrice,
        'Addbestoffer': AddBestOffer,
        'StoreName':StoreName ,
        'Quantity': Quantity,
        'MaxQuantity': Quantity,
        'Active': true,
        'Sold': false,
        'Pic': basex64,
        // "StartbidTime":StartbidTime,
        // "EndbidTime":EndbidTime,
        'product_ad_active':product_ad_active,
        'AutoRelist':AutoRelist,
        'declineprice':declineprice,
        'atleastprcieaccept':atleastprcieaccept,
         'DicountStatus':DicountStatus,
        'Discountprice':Discountprice,
         'Discountpersentage':Discountpersentage,
         'ListIndefinitly':ListIndefinitly,
         'ReserveStatus':ReserveStatus

//         Cat_Name done
// Sub_Cat_Name done
// Sub_Sub_Cat_Name  doen
// StoreName doen
// auction deon
// ProductID deon
// P_Title deon
// P_Des dedon
// P_Condition deon
// Active deon
// Sold deon
// FixedPrice deon
// Quantity deon
// MaxQuantity deon
// Pic deon
// Addbestoffer deon
// AutoRelist deon
// SrartingPrice deon
// MaxBidPrice  deon
// ReservePrice deon
// AuctionListing deon
// product_ad_active deon
// declineprice doen
// atleastprcieaccept deon

// -----------------------------
// DicountStatus doen
// Discountpriced deon
// Discountpersentage deon

       }, { headers: headers }).map((res: Response) => {
      if (res) {

        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();

          // for (let a = 0; a < arrayIndex; a++) {
          //   //console.log(a);
          //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
          // }

          localStorage.setItem('NewPost', 'Done');
          localStorage.setItem('NewProduct', Product_ID);
          localStorage.setItem('NewCat', CatName);
          this._nav.navigate(['/dashboard']);



          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      //console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  }
  // Add_WomenFashion_Product(Product_ID: any,  User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any) {
  //   if (isPlatformBrowser(this.platformId)){
  //   return this._http.post(this.ServerUrl + 'womenfashion',
  //     {
  //       'ProductID': Product_ID,
  //       'Cat_Name': CatName ,
  //       'Sub_Cat_Name': SubCat,
  //       'User_ID': User_ID,
  //       'Sub_Sub_Cat_Name': SubSubCat,
  //       'P_Title':  Title,
  //       'P_Des':  Addetail,
  //       'P_Condition':  condition,
  //       'Auction': Auction,
  //       'SrartingPrice': Starting_Price,
  //       'MaxBidPrice': Starting_Price,
  //       'Buyitnow': Buyitnow,
  //       'AuctionListing': AuctionListing,
  //       'ReservePrice': ReservePrice,
  //       'StoreName': localStorage.getItem('StoreName'),
  //       'FixedPrice': FixedPrice,
  //       'Addbestoffer': AddBestOffer,
  //       'Quantity': Quantity,
  //       'MaxQuantity': Quantity,
  //       'Active': true,
  //       'Sold': false,
  //       'Pic': basex64,
  //
  //
  //
  //       //    'Pidd':  Pidd,
  //     }).map((res: Response) => {
  //     if (res) {
  //       //console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //
  //         // for (let a = 0; a < arrayIndex; a++) {
  //         //   //console.log(a);
  //         //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
  //         // }
  //
  //
  //         localStorage.setItem('NewPost', 'Done');
  //         localStorage.setItem('NewProduct', Product_ID);
  //         localStorage.setItem('NewCat', CatName);
  //         this._nav.navigate(['/dashboard']);
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     //console.log(error.toString());
  //     return Observable.throw(new Error(error.status));
  //   });
  //
  //
  // }
  // }
  // Add_MenFashion_Product(Product_ID: any, User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any) {
  //
  //   if (isPlatformBrowser(this.platformId)){
  //   return this._http.post(this.ServerUrl + 'menfashion',
  //     {
  //       'ProductID': Product_ID,
  //       'Cat_Name': CatName ,
  //       'Sub_Cat_Name': SubCat,
  //       'User_ID': User_ID,
  //       'Sub_Sub_Cat_Name': SubSubCat,
  //       'P_Title':  Title,
  //       'P_Des':  Addetail,
  //       'P_Condition':  condition,
  //       'Auction': Auction,
  //       'SrartingPrice': Starting_Price,
  //       'MaxBidPrice': Starting_Price,
  //       'Buyitnow': Buyitnow,
  //       'AuctionListing': AuctionListing,
  //       'StoreName': localStorage.getItem('StoreName'),
  //       'ReservePrice': ReservePrice,
  //       'FixedPrice': FixedPrice,
  //       'Addbestoffer': AddBestOffer,
  //       'Quantity': Quantity,
  //       'MaxQuantity': Quantity,
  //       'Active': true,
  //       'Sold': false,
  //       'Pic': basex64,
  //
  //
  //
  //       //    'Pidd':  Pidd,
  //     }).map((res: Response) => {
  //     if (res) {
  //       //console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //         // for (let a = 0; a < arrayIndex; a++) {
  //         //   //console.log(a);
  //         //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
  //         // }
  //
  //         localStorage.setItem('NewPost', 'Done');
  //         localStorage.setItem('NewProduct', Product_ID);
  //         localStorage.setItem('NewCat', CatName);
  //         this._nav.navigate(['/dashboard']);
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     //console.log(error.toString());
  //     return Observable.throw(new Error(error.status));
  //   });
  //
  //
  // }
  // }
  // Add_TVAudioVideo_Product(Product_ID: any, User_ID,  basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any) {
  //
  //   if (isPlatformBrowser(this.platformId)){
  //   return this._http.post(this.ServerUrl + 'TVAudioVideo',
  //     {
  //       'ProductID': Product_ID,
  //       'Cat_Name': CatName ,
  //       'Sub_Cat_Name': SubCat,
  //       'User_ID': User_ID,
  //       'Sub_Sub_Cat_Name': SubSubCat,
  //       'P_Title':  Title,
  //       'P_Des':  Addetail,
  //       'P_Condition':  condition,
  //       'Auction': Auction,
  //       'StoreName': localStorage.getItem('StoreName'),
  //       'SrartingPrice': Starting_Price,
  //       'MaxBidPrice': Starting_Price,
  //       'Buyitnow': Buyitnow,
  //       'AuctionListing': AuctionListing,
  //       'ReservePrice': ReservePrice,
  //       'FixedPrice': FixedPrice,
  //       'Addbestoffer': AddBestOffer,
  //       'Quantity': Quantity,
  //       'MaxQuantity': Quantity,
  //       'Active': true,
  //       'Sold': false,
  //       'Pic': basex64,
  //
  //
  //
  //       //    'Pidd':  Pidd,
  //     }).map((res: Response) => {
  //     if (res) {
  //       //console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //
  //         // for (let a = 0; a < arrayIndex; a++) {
  //         //   //console.log(a);
  //         //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
  //         // }
  //
  //         localStorage.setItem('NewPost', 'Done');
  //         localStorage.setItem('NewProduct', Product_ID);
  //         localStorage.setItem('NewCat', CatName);
  //         this._nav.navigate(['/dashboard']);
  //
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     //console.log(error.toString());
  //     return Observable.throw(new Error(error.status));
  //   });
  //
  //
  // }
  // }
  // Add_ComputingLaptops_Product(Product_ID: any, User_ID: any,  basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any) {
  //  // //console.log('fsdfsfgsahd' + SubSubCat);
  //   if (isPlatformBrowser(this.platformId)) {
  //     return this._http.post(this.ServerUrl + 'ComputingLaptops',
  //       {
  //         'ProductID': Product_ID,
  //         'Cat_Name': CatName,
  //         'Sub_Cat_Name': SubCat,
  //         'User_ID': User_ID,
  //         'Sub_Sub_Cat_Name': SubSubCat,
  //         'P_Title': Title,
  //         'P_Des': Addetail,
  //         'P_Condition': condition,
  //         'Auction': Auction,
  //         'SrartingPrice': Starting_Price,
  //         'MaxBidPrice': Starting_Price,
  //         'StoreName': localStorage.getItem('StoreName'),
  //         'Buyitnow': Buyitnow,
  //         'AuctionListing': AuctionListing,
  //         'ReservePrice': ReservePrice,
  //         'FixedPrice': FixedPrice,
  //         'Addbestoffer': AddBestOffer,
  //         'Quantity': Quantity,
  //         'MaxQuantity': Quantity,
  //         'Active': true,
  //         'Sold': false,
  //         'Pic': basex64,
  //
  //
  //         //    'Pidd':  Pidd,
  //       }).map((res: Response) => {
  //       if (res) {
  //         //console.log('abc');
  //         if (res.status === 201) {
  //           const responce_data = res.json();
  //           // for (let a = 0; a < arrayIndex; a++) {
  //           //   //console.log(a);
  //           //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
  //           // }
  //
  //           localStorage.setItem('NewPost', 'Done');
  //           localStorage.setItem('NewProduct', Product_ID);
  //           localStorage.setItem('NewCat', CatName);
  //           this._nav.navigate(['/dashboard']);
  //           return [{status: res.status, json: res}];
  //         }
  //       }
  //     }).catch((error: any) => {
  //       //console.log(error.toString());
  //       return Observable.throw(new Error(error.status));
  //     });
  //   }
  //
  // }
  // Add_HomeAppliances_Product(Product_ID: any, User_ID: any, basex64: any, Title: any, CatName: any, SubCat: any, SubSubCat: any, condition: any, Addetail: any, Auction: any, Starting_Price: any, Buyitnow: any, ReservePrice: any, AuctionListing: any, FixedPrice: any, AddBestOffer: any, Quantity: any) {
  //
  //   if (isPlatformBrowser(this.platformId)){
  //   return this._http.post(this.ServerUrl + 'HomeAppliances',
  //     {
  //       'ProductID': Product_ID,
  //       'Cat_Name': CatName ,
  //       'Sub_Cat_Name': SubCat,
  //       'User_ID': User_ID,
  //       'Sub_Sub_Cat_Name': SubSubCat,
  //       'P_Title':  Title,
  //       'P_Des':  Addetail,
  //       'P_Condition':  condition,
  //       'StoreName': localStorage.getItem('StoreName'),
  //       'Auction': Auction,
  //       'SrartingPrice': Starting_Price,
  //       'MaxBidPrice': Starting_Price,
  //       'Buyitnow': Buyitnow,
  //       'AuctionListing': AuctionListing,
  //       'ReservePrice': ReservePrice,
  //       'FixedPrice': FixedPrice,
  //       'Addbestoffer': AddBestOffer,
  //       'Quantity': Quantity,
  //       'MaxQuantity': Quantity,
  //       'Active': true,
  //       'Sold': false,
  //       'Pic': basex64,
  //
  //
  //       //    'Pidd':  Pidd,
  //     }).map((res: Response) => {
  //     if (res) {
  //       //console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //
  //         // for (let a = 0; a < arrayIndex; a++) {
  //         //   //console.log(a);
  //         //   this.ProductImages(Product_ID, ALLbase64textStringforPic[a]).subscribe();
  //         // }
  //
  //
  //         localStorage.setItem('NewPost', 'Done');
  //         localStorage.setItem('NewProduct', Product_ID);
  //         localStorage.setItem('NewCat', CatName);
  //         this._nav.navigate(['/dashboard']);
  //
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     //console.log(error.toString());
  //     return Observable.throw(new Error(error.status));
  //   });
  //
  //
  // }
  // }

}
