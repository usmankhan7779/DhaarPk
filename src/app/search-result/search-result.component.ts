// import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { CategoryServices } from '../category-detail/category-detail.services';
// import { Ng2PaginationModule } from 'ng2-pagination';
//
// import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import {PaginatePipe, PaginationService} from 'ng2-pagination';
//
//
// @Component({
//   selector: 'app-search-result',
//   templateUrl: './search-result.component.html',
//   styleUrls: ['./search-result.component.css']
// })
// export class SearchResultComponent implements OnInit {
//
//   r: any;
//   pageno: any;
//   CoverPix: any;
//   sub: any;
//   PicServrUrl = 'https://apis.dhaar.pk/media/';
//   modelNo: any;
//   Trend: any = [];
//   GetPhotos: any = [];
//   Cart = false;
//   CatName: any;
//   SearchResults: any;
//   CartedProduct: any = [];
//   Total: number;
//
//   constructor( @Inject(PLATFORM_ID) private platformId: Object,
//                private _nav: Router,
//                private route: ActivatedRoute,
//                private httpService: CategoryServices) { }
//
//   pageTrendChanged(event) {
//     // alert("mobile")
//     this.r = event;
//     this.pageno = event;
//
//
//     this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
//       data => {
//         this.Trend = data;
//       });
//   }
//   ngOnInit() {
//
//     if (isPlatformBrowser(this.platformId)){
//
//     this.sub = this.route
//       .queryParams
//       .subscribe(params => {
//         // Defaults to 0 if no query param provided.
//         this.SearchResults = params['Search'] || '0' ;
//
//           this.CoverPix = 'PT';
//
//
//         this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
//           data => {
//             this.Trend = data;
//           });
//
//
//       });
//     if (this.SearchResults === '0') {
//       this._nav.navigate(['/404']);
//     }
//
//
//     this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
//     if (this.CartedProduct === null) {
//       this.Cart = true;
//     }
//     this.Total = 0;
//     for (const tmp of this.CartedProduct['products']) {
//       this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
//     }
//
//
//     this.httpService.GetphotoById().subscribe(resSlidersData => {
//       this.GetPhotos = resSlidersData;
//
//     });
//     }
//   }
//
//   TrashcartElement(Abc: any) {
//     if (isPlatformBrowser(this.platformId)) {
//       for (const tmp of this.CartedProduct['products']) {
//         if (tmp.ProductID === Abc) {
//
//           this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1);
//           localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
//
//
//         }
//
//       }
//       this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
//       if (this.CartedProduct === null) {
//         this.Cart = true;
//       }
//       this.Total = 0;
//       for (const tmp of this.CartedProduct['products']) {
//         this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
//       }
//
//     }
//   }
//
//
//   ClickCheckOut() {
//
//     this._nav.navigate(['/checkout2']);
//   }
//
//   BothAbove() {
//
//     this.httpService.getAllSearchProducts(this.pageno, this.SearchResults).subscribe(
//       data => {
//         this.Trend = data;
//       });
//   }
//   ProductType(abc: boolean) {
//
//
//     this.httpService.getAllSearchProductsType(this.pageno, this.SearchResults, abc).subscribe(
//       data => {
//         this.Trend = data;
//       });
//
//
//   }
//
//
//   ProductPrice(pk1: any, pk2: any) {
//
//     this.httpService.getAllSearchProductsPrice(this.pageno, this.SearchResults, pk1, pk2).subscribe(
//       data => {
//         this.Trend = data;
//       });
//   }
//
//
//
// }
