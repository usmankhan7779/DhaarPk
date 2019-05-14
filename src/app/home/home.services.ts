import 'rxjs/add/operator/map';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpService } from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import Swal from "sweetalert2";
import { HttpClient } from '@angular/common/http';



@Injectable()

export class HomeService {
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  // http://192.168.30.225:9000
  // https://apis.dhaar.pk
  
  ServerUrl = 'https://apis.dhaar.pk/products/';
  // ServerUrl = 'http://192.168.30.187:8000/products/';
  
  // serverurladdtocart=''


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private _http: HttpService,
    private httpclient :HttpClient,
    private http: Http,
    private _nav: Router) {
  }

  GetAllPhoneandtabletsProducts() {

    return this._http.get(this.ServerUrl + 'getphoneproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }
  GetAllProductsgatorgy(pk: string) {

    return this._http.get(this.ServerUrl + 'Related_Products/' + pk).map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetAllProductPicture(pk: string) {

    return this._http.get(this.ServerUrl + 'Getproductimages/' + pk).map(response => response.json());
    // console.log(this.CateDeatils)
  }


  GetWomenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getwomenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getTVAudioVideoProduct() {

    return this._http.get(this.ServerUrl + 'gettvaudioproducts8').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  GetMenFashionProducts4() {

    return this._http.get(this.ServerUrl + 'getmenfashionproducts4').map(response => response.json());
    // console.log(this.CateDeatils)
  }

  // getcomputinglaptopsproduct8() {

  //   return this._http.get(this.ServerUrl + 'getcomputinglaptopsproduct8').map(response => response.json());
  //   // console.log(this.CateDeatils)
  // }
  gethomeappliancesproduct8() {
    return this._http.get(this.ServerUrl + 'gethomeappliancesproduct4').map(response => response.json());
  }

  // id: string
  GetphotoById() {

    return this._http.get(this.ServerUrl + 'GetProductPic').map(response => response.json());
    // console.log(this.CateDeatils)
  }



  get_AnyProduct_ProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'getProductByProductID/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  get_PhoneAndTabletProduct_ProductById(proId: string) {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'getphoneproductsById/' + proId,{headers:headers}).map(response => response.json());
    // console.log(this.CateDeatils)
    }
    else  {
      return this._http.get(this.ServerUrl + 'getphoneproductsById/' + proId).map(response => response.json());
    }
  }
  getWomenFashionProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'getwomenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getMenFashionProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'getmenfashionProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  geTVAudioVideoProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'gettvaudiovideoproductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getComputingLaptopsProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'getComputingLaptopsProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  getHomeAppliancesProductById(proId: string) {

    return this._http.get(this.ServerUrl + 'getHomeAppliancesProductById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }




  GetAuctionProductPriceById(proId: string) {

    return this._http.get(this.ServerUrl + 'GetAuctionProductPriceById/' + proId).map(response => response.json());
    // console.log(this.CateDeatils)
  }
  GetProductsfromAllCatPageNumber(page: any) {
  
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
 
    // // // console.log('pofile', localStorage.getItem('Authorization'));
    // return this._http.get(this.ServerUrl + 'getProductsfromAllCat' +'?page=' + page,).map(response => response.json());
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getProductsfromAllCat'+'?page=' + page, { headers: headers }).map(response =>

        // getProductsfromAllCat
        response.json()

      );


    }
    else  {
      return this._http.get(this.ServerUrl + 'getProductsfromAllCat'+'?page=' + page).map(response => response.json());

    }
}
  GetProductsfromAllCat() {
    // page: number
    if (localStorage.getItem('Authorization') !== null) {
      // let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // // headers.append('Authorization', 'Token ' +  this.authentication);
      // headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      return this.httpclient.get(this.ServerUrl + 'getProductsfromAllCAtHome/').map((response :Response) =>

        // getProductsfromAllCat
        response
      );


    }
    else  {
      return this._http.get(this.ServerUrl + 'getProductsfromAllCAtHome/').map(response => response.json());

    }

  }
  Getlikeforyou() {
  
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
   
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getFunProductsHome/', { headers: headers }).map(response => response.json());
     
  }
  GetlikeforyouPageNumber(page: any) {
  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    // // console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'getalljustfunproducts' +'?page=' + page,).map(response => response.json());
   
}
// GetlikeforyouPageNumber(page: any) {
  
//   let headers = new Headers();
//   headers.append('Content-Type', 'application/json');

//   // // console.log('pofile', localStorage.getItem('Authorization'));
//   return this._http.get(this.ServerUrl + 'getalljustfunproducts' +'?page=' + page,).map(response => response.json());
 
// }
  // getalljustfunproducts
  GetAuctionProductsfromAllCatPageNumber(page: any) {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getAuctionProductsfromAllCat'+'?page=' + page, { headers: headers }).map(response => response.json());
     
    }
    else {
      return this._http.get(this.ServerUrl + 'getAuctionProductsfromAllCat'+'?page=' + page).map(response => response.json());
      
    }
  }
  GetAuctionProductsfromAllCat() {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getAuctionProductsfromAllCAtHome/', { headers: headers }).map(response => response.json());
      // console.log(this.CateDeatils)
      // getAuctionProductsfromAllCat
    }
    else {
      return this._http.get(this.ServerUrl + 'getAuctionProductsfromAllCAtHome/').map(response => response.json());
      // console.log(this.CateDeatils)getAuctionProductsfromAllCAtHome
    }
  }
  GetBuyNowProductsfromAllCat() {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getBuyNowProductsfromAllCAtHome/', { headers: headers }).map(response => response.json());
      // getBuyNowProductsfromAllCat
    }
    else {
      return this._http.get(this.ServerUrl + 'getBuyNowProductsfromAllCAtHome/').map(response => response.json());
    }
  }
  GetBuyNowProductsfromAllCatPageNumber(page: any) {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getBuyNowProductsfromAllCat'+'?page=' + page, { headers: headers }).map(response => response.json());
     
    }
    else {
      return this._http.get(this.ServerUrl + 'getBuyNowProductsfromAllCat'+'?page=' + page).map(response => response.json());
      
    }
  }
  GetAllFeaturedProducts() {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getFeaturedProductHome/', { headers: headers }).map(response => response.json());
      // console.log(this.CateDeatils)
      // getallfeaturedProducts
    }
    else {
      return this._http.get(this.ServerUrl + 'getFeaturedProductHome/').map(response => response.json());
      // console.log(this.CateDeatils)

    }
  }
  GetAllFeaturedProductsPageNumber(page: any) {
    if (localStorage.getItem('Authorization') !== null) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      return this._http.get(this.ServerUrl + 'getallfeaturedProducts'+'?page=' + page, { headers: headers }).map(response => response.json());
     
    }
    else {
      return this._http.get(this.ServerUrl + 'getallfeaturedProducts'+'?page=' + page).map(response => response.json());
      
    }
  }

  GetallBidsProductdbyProductID(ProductID: any) {
    return this._http.get(this.ServerUrl + 'GetallBidsProductd/' + ProductID).map(response => response.json());
  }

  GetallProductsOffersByStoreName(page: any, StoreName: any) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // // headers.append('Authorization', 'Token ' +  this.authentication);
    // headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // // console.log('pofile', localStorage.getItem('Authorization'));

    return this._http.get(this.ServerUrl + 'GetallProductsOffersByStoreName/' + StoreName + '?page=' + page).map(response => response.json());
  }

  GetallUserReviewsBYProductId(pID: any) {
    return this._http.get(this.ServerUrl + 'InsertUserReview/' + pID).map(response => response.json());
  }

  GetallUserReviewsCalculationBYProductId(pID: any) {
    return this._http.get(this.ServerUrl + 'GetUserReviewsCalculationByProductID/' + pID).map(response => response.json());
  }
  UnwatchProduct(Product_ID: any, User_ID: any) {

    return this._http.delete(this.ServerUrl + 'unwatchProduct/' + Product_ID + '/' + User_ID).map((res: Response) => {
      if (res) {

        if (res.status === 204) {
          const responce_data = res.json();
          return [{ status: res.status, json: res }];
        }
      }
    }).catch((error: any) => {
      console.log(error.toString());
      return Observable.throw(new Error(error.status));
    });

  }
// GetAllRecentProducts(Productid) {
//     if (localStorage.getItem('Authorization') !== null) {
//       const headers = new Headers();
//       headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
//       // console.log('pofile', localStorage.getItem('Authorization'));
//       headers.append('Content-Type', 'application/json');
//       if (isPlatformBrowser(this.platformId)) {

//         return this._http.post(this.ServerUrl + 'addrecentproduct/',
//           {
//             'productid': Productid,
//             // 'Cat_Name': CatName ,
//             // 'User_ID': User_ID,
//           }, { headers: headers }).map((res: Response) => {
//             if (res) {

//               if (res.status === 200) {
//                 const responce_data = res.json();
//                 return responce_data;
//               }
//             }
//           }).catch((error: any) => {
//             console.log(error.toString());
//             return Observable.throw(new Error(error.status));
//           });


//       }
//     }
     
//   }

  womenFashion(category_name1) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name1,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name1,
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

    }
  }
  PhoneandTablet(category_name2) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {
        // this.ServerUrl +
        return this._http.post( this.ServerUrl +'Category_ProductsHome/',
          {
            'category_name1': category_name2,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name2,
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

    }
  }
  PhoneandTabletwithPage(category_name23,Sub_Cat_Name,page:any) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {
        // this.ServerUrl +
        return this._http.post( this.ServerUrl +'Category_Products/'+'?page=' + page,
          {
            'category_name1': category_name23,
            // 'Subcat':SubCat_Name,
            'SubSubcat':Sub_Cat_Name
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_Products/'+'?page=' + page,
          {
            'category_name1': category_name23,
            // 'Subcat':SubCat_Name,
            'SubSubcat':Sub_Cat_Name
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

    }
  }
  MenFashion(category_name3) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name3,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name3,
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

    }
  }
  TV(category_name4) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name4,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name4,
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

    }
  }
  Computer(category_name5) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name5,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name5,
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

    }
  }
  Home(category_name6) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name6,
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_ProductsHome/',
          {
            'category_name1': category_name6,
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

    }
  }
  subsubcatmenu(Cat_Name,Sub_Cat_Namess,page:any) {
    if (localStorage.getItem('Authorization') !== null) {
      const headers = new Headers();
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_Products/'+'?page=' + page,
          {
            'category_name1':Cat_Name,
            'SubSubcat': Sub_Cat_Namess
            // 'category_name1': category_name23,
            // // 'Subcat':SubCat_Name,
            // 'SubSubcat':Sub_Cat_Name
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
    }
    else {
      const headers = new Headers();
      // headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
      // // console.log('pofile', localStorage.getItem('Authorization'));
      headers.append('Content-Type', 'application/json');
      if (isPlatformBrowser(this.platformId)) {

        return this._http.post(this.ServerUrl + 'Category_Products/'+'?page=' + page,
          {
            'category_name1':Cat_Name,
            'SubSubcat': Sub_Cat_Namess
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

    }
  }
  WatchProduct(Product_ID: any) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // console.log('pofile', localStorage.getItem('Authorization'));
    headers.append('Content-Type', 'application/json');
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'watchList/',
        {
          'product': Product_ID,
          // 'Cat_Name': CatName ,
          // 'User_ID': User_ID,
        }, { headers: headers }).map((res: Response) => {
          // if (res) {

            // if (res.status === 200) {
              // const responce_data = res.json();
              // return [{ status: res.status, json: res }];
              // const responce_data = 
             return res.json();
              // console.log(res.json())
              // return { status: res.status, responce_data };
            // }
          // }
        }).catch((error: any) => {
          console.log(error.toString());
          return Observable.throw(new Error(error.status));
        });


    }
  }
  GetAllProductcart() {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'CheckoutProducts/', { headers: headers }).map(response => response.json());

  }

  DeleteTodoList(id: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.delete(this.ServerUrl + 'Checkout_Edit/' + id,
      { headers: headers }).map((response: Response) => response.json());
  }

  Deletewatchlist(id: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.delete(this.ServerUrl + 'editwatchList/' + id,
      { headers: headers }).map((response: Response) => response.json());
  }


  quentity: number;
  addtocartProduct(Product_ID: any, qty: any) {
    this.quentity = qty;
    // alert(this.quentity)
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    // console.log('pofile', localStorage.getItem('Authorization'));
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'CheckoutProducts/',
        {
          'product_id': Product_ID,
          "qty": this.quentity
        }, { headers: headers }).map((res: Response) => {
          if (res) {
            if (res.status === 201 || res.status === 200) {

              const responce_data = res.json()['Message'];
              return { status: res.status, responce_data };

            }
          }
        }).catch((error: any) => {
          console.log(error.toString());
          return Observable.throw(new Error(error.status));
        });


    }
  }

  // WatchProduct(pID: any, catName: any, UserID: any, Store: any, SubCat: any, SubsubCat: any, pTiltle: any, pDes: any, pCon: any, Auction: any, SPrice: any, Active: any, sold: any, MPrice: any, BuyitNow: any, ReservePrice: any, AuctionList: any, FPrice: any, AddBestOffer: any, Quantity: any, MaxQuantity: any, Pic: any) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this._http.post('http://127.0.0.1:8000/products/' + 'watchList/' + UserID, {
  //     'ProductID': pID,
  //     'Cat_Name': catName,
  //     'User_ID': UserID,
  //     'StoreName': Store,
  //     'Sub_Cat_Name': SubCat,
  //     'Sub_Sub_Cat_Name': SubsubCat,
  //     'P_Title': pTiltle,
  //     'P_Des': pDes,
  //     'P_Condition': pCon,
  //     'Auction': Auction,
  //     'SrartingPrice': SPrice,
  //     'Active': Active,
  //     'Sold': sold,
  //     'MaxBidPrice': MPrice,
  //     'Buyitnow': BuyitNow,
  //     'ReservePrice': ReservePrice,
  //     'AuctionListing': AuctionList,
  //     'FixedPrice': FPrice,
  //     'Addbestoffer': AddBestOffer,
  //     'Quantity': Quantity,
  //     'MaxQuantity': MaxQuantity,
  //     'Pic': Pic,
  //   },{ headers: headers }).map((res: Response) => {
  //     if (res) {
  //       // console.log('abc');
  //       if (res.status === 201) {
  //         const responce_data = res.json();
  //         return [{ status: res.status, json: res }];
  //       }
  //     }
  //   }).catch((error: any) => {
  //     return Observable.throw(new Error(error.status));
  //   });
  // }

  InsertwinnerBid(user: any, product: any) {
    return this.http.put(this.ServerUrl + 'InsertWinnerBid/' + user + '/' + product,
      {
        'win': true,
      }).map((res: Response) => {
        if (res) {
          // console.log('abc');
          if (res.status === 201) {
            const responce_data = res.json();
            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  InsertUserBid(User_Id: any, Product_ID: any, Price: any) {
    console.log('userId:', User_Id, 'ProductId is:', Product_ID, 'Price is:', Price);
    return this._http.post(this.ServerUrl + 'InsertUserBid',
      {
        'User_Id': User_Id,
        'Product_Id': Product_ID,
        'Price': Price,
      
      }).map((res: Response) => {
        if (res) {
          // console.log('abc');
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
            return [{ status: res.status, json: res }];
          }
        }
      }).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });


  }

  InsertProductReviews(Reviews: any, Product_ID: any, RateNUmber: any) {
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      // console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.post(this.ServerUrl + 'InsertUserReview/' + Product_ID,
      {
        // 'Name': Name,
        // 'user': user,
        'productid': Product_ID,
        // 'StoreName': StoreName,
        'rating': RateNUmber,
        'review': Reviews,
      },{headers:headers}).map((response: Response) => response.json());


  }
  // {
  //   "productid":"857993824b50411ebb9783dcdf9a14d9",
  //   "review":"helooooo",
  //   "rating":2.3
  //   }

  ProductOffers(Product_ID: any, StoreName: any, Title: any, Cat_Name: any, model: any) {
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'ProductsOffersInsert',
        {

          'User_ID': localStorage.getItem('UserID'),
          'Product_ID': Product_ID,
          'StoreName': StoreName,
          'P_Title': Title,
          'Cat_Name': Cat_Name,
          'PricePerQuantity': model.OfferAmount,
          'Status': true,
          'Accept': false,
          'Quantity': model.QuantityProduct,
          'CounterStatus': false,
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
          Swal.fire('Your Offer has been Updated', '', 'success');
          console.log(error.toString());
          return Observable.throw(new Error(error.status));
        });


    }
  }





}
