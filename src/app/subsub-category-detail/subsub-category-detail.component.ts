import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CategoryServices } from '../category-detail/category-detail.services';


import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';


@Component({
  selector: 'app-subsub-category-detail',
  templateUrl: './subsub-category-detail.component.html',
  styleUrls: ['./subsub-category-detail.component.css']
})
export class SubsubCategoryDetailComponent implements OnInit {

  r: any;
  pageno: any;
  sub: any;
  modelNo: any;
  Trend: any = [];
  Trendee: any = [];
  GetPhotos: any = [];
  CatName: any;
  Subcat: any;
  CoverPix: any;
  CartedProduct: any = [];
  Total: number;
  Cart = false;
  errormessage = false;
  Waitcall = false;
  View = false;

  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private GetProducts: HomeService,
               private httpService: CategoryServices) { }

  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;


    this.httpService.getAllSubSubPhoneAndTabletProduct(this.pageno,this.Subcat).subscribe(
      data => {
        this.Trend = data;
      });
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sub = this.route.params.subscribe(params => {
        this.CatName = params['CatName'];
        this.Subcat = params['SubsubCat'];


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
        } else if (this.CatName === 'Online Services') {
          this.CoverPix = 'OS';
        } else if (this.CatName === 'Sports Goods') {
          this.CoverPix = 'SG';
        } else if (this.CatName === 'Baby & Kids') {
          this.CoverPix = 'BK';
        } else if (this.CatName === 'Health & Beauty') {
          this.CoverPix = 'HB';
        } else if (this.CatName === 'Vehicles & GPS') {
          this.CoverPix = 'VG';
        }


        // alert(this.CatName);
          //  console.log('Phones & Tablets')
          // this.httpService.getAllSubSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
          //   data => {
          //     this.Trendee = data;
          //     if (this.Trendee['results'].length === 0) {
          //       this.errormessage = true;
          //     }
          //   });
            // this.Subcat = params['SubCat'];
        this.GetProducts.subsubcatmenu(this.Subcat).subscribe(resSlidersData => {
              console.log(resSlidersData)
              this.Trend = resSlidersData.Results;
              if (this.Trend['Total Result'] === 0) {
                this.errormessage = true;
              }
            });
      });
      if (this.CatName === '0') {
        this._nav.navigate(['/404']);
      }


      this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      if (this.CartedProduct === null) {
        this.Cart = true;
      }
      this.Total = 0;
      if (this.CartedProduct !== null) {
      for (const tmp of this.CartedProduct['products']) {
        this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
      }
      }



      // this.httpService.GetphotoById().subscribe(resSlidersData => {
      //   this.GetPhotos = resSlidersData;
      //
      // });
    }
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
      this.httpService.getAllSubSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = false;
          }
        });

    this.Waitcall = false;

  }

  BuyItNowFuc(type) {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubSubPhoneAndTabletProductType(1, this.Subcat,type).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });


    this.Waitcall = false;

  }

  thisAuctionFuc(type) {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
      //  console.log('Phones & Tablets')
      this.httpService.getAllSubSubPhoneAndTabletProductType(1, this.Subcat,type).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['results'].length === 0) {
            this.errormessage = true;
          }
        });

    this.Waitcall = false;

  }

  BothAbove() {

      //  console.log('Phones & Tablets')
      this.httpService.getAllSubSubPhoneAndTabletProduct(1, this.Subcat).subscribe(
        data => {
          this.Trend = data;
        });

  }
  ProductType(abc: boolean) {

      //  console.log('Phones & Tablets')
      this.httpService.getAllSubSubPhoneAndTabletProductType(1, this.Subcat, abc).subscribe(
        data => {
          this.Trend = data;
        });

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

      //  console.log('Phones & Tablets')
      this.httpService.getAllSubSubPhoneAndTabletProductPrice(1, this.Subcat, pk1, pk2).subscribe(
        data => {
          this.Trend = data;
        });
  }
}
