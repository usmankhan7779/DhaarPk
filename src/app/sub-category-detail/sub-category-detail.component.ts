import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CategoryServices } from '../category-detail/category-detail.services';


import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';
import { PagerService } from '../pager.service';
import { SharedData } from '../shared-service';


@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.css']
})
export class SubCategoryDetailComponent implements OnInit {
  r: any;
  pager: any = {};
  pageno: any;
  sub: any;
  Vendor;
  modelNo: any;
  Trend: any = [];
  Trendee: any = [];
  GetPhotos: any = [];
  CatName: any;
  Subcat: any;
  Waitcall = false;
  errormessage = false;
  CoverPix: any;
  CartedProduct: any = [];
  Total: number;
  View = false;
  Cart = false;
  total: any;
  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;


  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               public _shareData: SharedData,
               private GetProducts: HomeService,
               private pagerService: PagerService,
               private route: ActivatedRoute,
               private httpService: CategoryServices) { }

  // pageTrendChanged(event) {
  //   // alert("mobile")
  //   this.r = event;
  //   this.pageno = event;


  //   this.httpService.getAllSubPhoneAndTabletProduct(this.pageno,this.Subcat).subscribe(
  //     data => {
  //       this.Trend = data;
  //     });
  // }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sub = this.route.params.subscribe(params => {
        this.CatName = params['CatName'];
        this.Subcat = params['SubCat'];
        // alert(this.CatName);
        if (this.CatName === 'Phones & Tablets') {
          this.CoverPix = 'PT';
        } else if (this.CatName === 'Women\'s Fashion') {
          this.CoverPix = 'WF';
        } else if (this.CatName === 'Men\'s Fashion') {
          this.CoverPix = 'MF';
        } else if (this.CatName === 'TV, Audio & Video') {
          this.CoverPix = 'TAV';
        } else if (this.CatName === 'Computing & Laptops') {
          this.CoverPix = 'CL';
        } else if (this.CatName === 'Home Appliances') {
          this.CoverPix = 'HA';
        } else if (this.CatName === 'Sports Goods') {
          this.CoverPix = 'SG';
        } else if (this.CatName === 'Baby & Kids') {
          this.CoverPix = 'BK';
        } else if (this.CatName === 'Health & Beauty') {
          this.CoverPix = 'HB';
        } else if (this.CatName === 'Vehicles & GPS') {
          this.CoverPix = 'VG';
        }

this.showallproducts(1);
          //  console.log('Phones & Tablets')
          // this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
          //   data => {
          //     this.Trendee = data;
          //     if (this.Trendee['results'].length === 0) {
          //       this.errormessage = true;
          //     }
          //   });
        // this.Subcat = params['SubCat'];
        // this.GetProducts.PhoneandTablet(this.Subcat).subscribe(resSlidersData => {
        //       console.log(resSlidersData)
        //       this.Trend = resSlidersData.Results;
        //       if (this.Trend['Total Result'] === 0) {
        //         this.errormessage = true;
        //       }
        //     });
        this.Waitcall = false;

      });
      if (this.CatName === '0') {
        this._nav.navigate(['/404']);
      }


      // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      // if (this.CartedProduct === null) {
      //   this.Cart = true;
      // }
      // this.Total = 0;
      // if (this.CartedProduct !== null) {
      // for (const tmp of this.CartedProduct['products']) {
      //   this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
      // }
      // }
      this.GetProducts.GetAllProductcart().subscribe(resSlidersData => {

        this.CartedProduct = resSlidersData;
    
        console.log(this.CartedProduct.Results, 'cart')
        this.total = this.CartedProduct['Total Result']
        this._shareData.watchtotal(this.total);
   
   
        console.log('Carted products are:', this.CartedProduct);
        if (this.CartedProduct.Results === null) {
          this.Cart = true;
        }
        this.Total = 0;
       
        if (this.CartedProduct !== null) {
        for (const tmp of this.CartedProduct.Results) {
          
          this.Total = this.Total + (tmp.product.FixedPrice * tmp.Quantity);
          console.log(tmp.product.FixedPrice, 'total')
        }
        console.log(this.Total)
        }
      });
  

    
    }
  }

  showallproducts(page: number){
    this.GetProducts.PhoneandTablet(this.Subcat).subscribe(resSlidersData => {
      console.log(resSlidersData)
      // this.Trend = resSlidersData.Results;
      
      let demoprods;
      demoprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      console.log(demoprods)
      for (let prods of demoprods) {
        this.Trend.push(prods.product);
      }
      this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
  console.log(this.Trend);
  
      if (this.Trend['Total Result'] === 0) {
        this.errormessage = true;
      }
    });
  }
  
  message() {
    this.errormessage = !this.errormessage;
  }

  listView() {
    this.View = true;
  }

  GridView() {
    this.View = false;
  }

  AllListingFuc() {
    this.AllListing = true;
    this.BuyItNow = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });

    this.Waitcall = false;

  }

  BuyItNowFuc() {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductbuy(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });

    this.Waitcall = false;

  }

  thisAuctionFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductauction(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    this.Waitcall = false;

  }






  BothAbove() {

    this.Waitcall = true;
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });

    this.Waitcall = false;
  }
  ProductType(abc: boolean) {
    this.Waitcall = true;
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });
    this.Waitcall = false;

  }

  TrashcartElement(Abc: any) {
    if (isPlatformBrowser(this.platformId)) {
      for (const tmp of this.CartedProduct['products']) {
        if (tmp.ProductID === Abc) {

          this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1);
          localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));


        }

      }
      this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      if (this.CartedProduct === null) {
        this.Cart = true;
      }
      this.Total = 0;
      for (const tmp of this.CartedProduct['products']) {
        this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
      }

    }
  }

  ProductPrice(pk1: any, pk2: any) {
    this.Waitcall = true;
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubPhoneAndTabletProductWithPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });

    this.Waitcall = false;
  }

}
