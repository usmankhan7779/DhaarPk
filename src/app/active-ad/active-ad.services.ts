import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import Swal from "sweetalert2";
import {isPlatformBrowser} from "@angular/common";



@Injectable()
export class ActiveAdServices {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  // http://192.168.30.225:7000
  // https://apis.dhaar.pk
  ServerUrl = 'https://apis.dhaar.pk/products/';
  StoreServerUrl = 'https://apis.dhaar.pk/store/';

  constructor(private _http: Http,
              private _nav: Router) {
  }


  GetAllActiveproductsBYUserID(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getAll_Active_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  getAll_ProductBYUserID(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getAll_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }
  getactiveproductbystorename(page: any, UserID: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get( this.StoreServerUrl + 'store_products_active/' + UserID + '?page=' + page,{headers : headers} ).map(response => response.json());
  }
  getdeacvtiveproductbystorename(page: any, UserID: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get( this.StoreServerUrl + 'store_products_deactive/' + UserID + '?page=' + page,{headers : headers} ).map(response => response.json());
  }
  getAll_ProductBYStoreName( UserID: any) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // // headers.append('Authorization', 'Token ' +  this.authentication);
    // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    // //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get( this.ServerUrl + 'GetallProductsOffersByStoreName/' + UserID ).map(response => response.json());
  }
  getBuyNow_ProductBYStoreName(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'getBuyNow_ProductBYStoreName/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  GetAllPendingproductsBYUserID(page: any, UserID: any) {

    return this._http.get( this.ServerUrl + 'getAll_pending_ProductBYUserID/' + UserID + '?page=' + page, ).map(response => response.json());
  }

  GetallProductdBids( ) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    headers.append('Content-Type', 'application/json');
    return this._http.get( this.ServerUrl + 'GetallProductdBids/' ,{headers:headers}  ).map(response => response.json());
  }
  // GetSuccessfulBids( UserID: any) {
  //   return this._http.get( this.ServerUrl + 'GetWinProductdBids/' + UserID ).map(response => response.json());
  // }
  GetSuccessfulBids(win) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
   
      return this._http.post(this.ServerUrl + 'GetWinProductdBids',
          {
            'win':win
            // 'Cat_Name': CatName ,
            // 'User_ID': User_ID,
          }, { headers: headers }).map((res: Response) => {
            if (res) {

              if (res.status === 200) {
                const responce_data = res.json();
                return responce_data;
              }
            }
          }).catch((error: any) => {
            console.log(error.toString());
            return Observable.throw(new Error(error.status));
          });
  }

  // GetSuccessfulBids(win) {
   
  //   const headers = new Headers();
  //   headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
  //   //console.log('pofile', localStorage.getItem('Authorization'));
  //   headers.append('Content-Type', 'application/json');
  //   // if (isPlatformBrowser(this.platformId)) {

  //     return this._http.post(this.ServerUrl + 'GetWinProductdBids',
  //       {
  //         // 'category_name': category_name,
  //         // "filter_type":fillter
  //        'win':win
  //         // 'Cat_Name': CatName ,
  //         // 'User_ID': User_ID,
  //       }, { headers: headers }).map((res: Response) => {
  //         if (res) {

  //           if (res.status === 200) {
  //             const responce_data = res.json();
  //             return responce_data;
  //           }
  //         }
  //       }).catch((error: any) => {
  //         console.log(error.toString());
  //         return Observable.throw(new Error(error.status));
  //       });


  //   }
   
  
// }
  


  GetallWatchProducts(page: any, UserID: any) {
    return this._http.get( this.ServerUrl + 'GetallWatchProducts/' + UserID + '?page=' + page, ).map(response => response.json());
  }
  getwatchproducts(){
    const headers = new Headers();
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.ServerUrl + 'watchList/',{headers:headers}).map(response => response.json());
  }

  GetStoreInformation() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.StoreServerUrl + 'GetStoreInformation/' ,{headers :headers}).map((response: Response) => response.json());

  }
  GetStoreInformationofferbystorename() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.StoreServerUrl + 'GetStoreInformation/' ,{headers :headers}).map((response: Response) => response.json());

  }

  GetAllcoupons(decoded: any) {

    return this._http.get(this.ServerUrl + 'GetAllcoupons/' + decoded).map(response => response.json());
  }
 GetOnecouponsByID(store: any, coded: any) {

    return this._http.get(this.ServerUrl + 'GetOnecouponsBycode/' + store + '/' + coded).map(response => response.json());
  }
 GetOfferStatus(pk: any, us: any) {

    return this._http.get(this.ServerUrl + 'GetOfferStatus/' + pk + '/' + us).map(response => response.json());
  }

  VerifyProductID(pk: any, store: any) {

    return this._http.get(this.ServerUrl + 'VerifyProducts/' + pk + '/' + store).map(response =>  response.json());
  }

  OfferProducts(id:any) {
    return this._http.get(this.ServerUrl + 'ProductOfferstatus/'+ id).map(response => response.json());
  }

  GetStoreOffers(st:any) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // // headers.append('Authorization', 'Token ' +  this.authentication);
    // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    // //console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'GetallProductsOffersByStoreName/' + st).map(response => response.json());
  }

  DeleteOffer(pk:any, st:any) {
    return this._http.delete(this.ServerUrl + 'deleteOffer/' + pk + '/' + st).map(response => response.json());
  }

  DisableProduct(CatName: any, ProductID: any) {
    return this._http.post(this.ServerUrl + 'DisableProduct/'+ProductID + '/' + CatName,
      {
        'Active': false
      }).map((res: Response) => {
      console.log('Helllooo i am in map');

      if (res) {
        if (res.status === 201 || res.status === 200) {

        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });
  }
  EnableProduct(CatName: any, ProductID: any) {
    return this._http.post(this.ServerUrl + 'DisableProduct/'+ProductID + '/' + CatName,
      {
        'Active': true
      }).map((res: Response) => {
      console.log('Helllooo i am in map');

      if (res) {
        if (res.status === 201 || res.status === 200) {

        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });
  }

  SellerCounterOffers(pk:any, st:any, model: any) {
    return this._http.put(this.ServerUrl + 'counterOfferSeller/' + pk + '/' + st,
      {
        'PricePerQuantity': model.OfferAmount,
        'Quantity': model.QuantityProduct,
        'Message': model.message,
        'Status' : true,
        'Accept' : false,
        'CounterStatus' : true
      }).map((res: Response) => {
      if (res) {
        // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      Swal.fire('Your Offer has been Updated','','success');
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }
  BuyerCounterOffers(pk:any, st:any, model: any) {
    return this._http.put(this.ServerUrl + 'counterOfferBuyer/' + pk + '/' + st,
      {
        'PricePerQuantity': model.OfferAmount,
        'Quantity': model.QuantityProduct,
        'Message': model.message,
        'Status' : true,
        'Accept' : true,
        'CounterStatus' : true
      }).map((res: Response) => {
      if (res) {
        // console.log('abc');
        if (res.status === 201) {
          const responce_data = res.json();

          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      Swal.fire('Your Offer has been Updated','','success');
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });


  }

  rejectOffer(pk:any, st:any){
    return this._http.put(this.ServerUrl + 'rejectOffer/' + pk + '/' +st,
      {
        'Accept': false,
        'Status': false,
        'CounterStatus': false
      }).map((res: Response) => {
      console.log('Helllooo i am in map');

      if (res) {
        if (res.status === 201 || res.status === 200) {

        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });
  }

  acceptOffer(pk:any, st:any){
    console.log('Helllooo i am in service function');
    return this._http.put(this.ServerUrl + 'acceptOffer/' + pk + '/' + st,
      {
        'Accept': true,
        'Status': true,
        'CounterStatus': false
    })
      .map((res: Response) => {
        console.log('Helllooo i am in map');

        if (res) {
          if (res.status === 201 || res.status === 200) {

          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  InsertDisCountcoupons(cname: any, Qty: string, Discount: string , Day: string, StoreName, PID) {
    console.log('Yahoooo22222222',cname, Qty, Discount, Day, StoreName, PID);
    return this._http.post( this.ServerUrl + 'insertdiscountcoupons/', {

      'Qty' :  Qty,
      'Discount':  Discount,
      'Day':  Day,
      'CouponsCode': cname,
      'StoreName':  StoreName ,
      'ProductID':  PID

    })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {

          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  ProductOffers(user:any, pro:any, model: any) {
      return this._http.put(this.ServerUrl + 'changeOffer/' + user + '/' + pro,
        {

          'PricePerQuantity': model.OfferAmount,
          'Quantity': model.QuantityProduct,
          'Message': model.message,

          //    'Pidd':  Pidd,
        }).map((res: Response) => {
        if (res) {
          // console.log('abc');
          if (res.status === 201) {
            const responce_data = res.json();

            // console.log('this is the id' + responce_data.id);
            // localStorage.setItem('Authorization', res.json().token);

            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {
        Swal.fire('Your Offer has been Updated','','success');
        console.log(error.toString());
        return Observable.throw(new Error(error.status));
      });


    }

}
