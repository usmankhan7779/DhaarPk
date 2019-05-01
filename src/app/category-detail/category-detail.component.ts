import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CategoryServices } from './category-detail.services';


import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';
import Swal from 'sweetalert2';
import { SharedData } from '../shared-service';
import { StaticInjector } from '@angular/core/src/di/injector';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  r: any;
  pageno: any;
  public GetallPhoneProduct: any = [];
  CoverPix: any;
  sub: any;
  pager: any = {};
  modelNo: any;
  Trendee: any = [];
  Trend: any = [];
  GetPhotos: any = [];
  Cart = false;
  View = false;
  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;
  Waitcall = false;
  errormessage = false;
  CatName: any;
  CartedProduct: any = [];
  Total: number;
  Vendor;
  ProType = false;
  ProStatus = false;
  Price1: string;
  Price2: string;
  PriceStatus = false;
  BothCheck = false;
  total: any;
  userlogin = false;
  Auctions = true;
  bothabove;
  fixeds;
  Subcat: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private _nav: Router,
    public _shareData: SharedData,
    private GetAdd: HomeService,
    private pagerService: PagerService,
    private route: ActivatedRoute,
    private GetProducts: HomeService,
    private httpService: CategoryServices) {
  }

  // pageTrendChanged(event) {
  //   // alert("mobile")
  //   this.r = event;
  //   this.pageno = event;

  //   // alert(this.pageno);
  //   this.httpService.getAllPhoneAndTabletProduct(this.pageno, this.CatName).subscribe(
  //     data => {
  //       this.Trendee = data;
  //     });
  // }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.Waitcall = true;
      this.errormessage = false;
      this.sub = this.route
        .queryParams
        .subscribe(params => {

          this.CatName = params['CatName'] || '0';
          this.Subcat = params['SubCat'] || '0';

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


          this.Waitcall = false;
        });
      if (this.CatName === '0') {
        this._nav.navigate(['/404']);
      }



      this.vendors();
      if (localStorage.getItem('UserName') != null) {
        this.viewaddtocart();
      }

    }





  }
  viewaddtocart() {
    this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

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

  showallproducts(page: number) {
    this.GetProducts.PhoneandTabletwithPage(this.CatName,page).subscribe(resSlidersData => {
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
    this.errormessage = false;
    this.Waitcall = true;

    // alert(this.CatName);
    //  console.log('Phones & Tablets')
    this.GetProducts.PhoneandTablet(this.CatName).subscribe(
      data => {
        this.Trend = data.Results;

        // let demoprods;
        // demoprods = data.Results;
        // //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoprods)
        // for (let prods of demoprods) {
        //   this.Trend.push(prods.product);
        // }
        if (this.Trend['totalItems'] === 0) {
          this.errormessage = true;
        }
      });
    this.Waitcall = false;

  }
  vendors() {
    if (localStorage.getItem('Vendor') == 'true') {
      this.Vendor = true;
    }
    else if (localStorage.getItem('Vendor') == 'false') {
      this.Vendor = true;
    }
    else if (localStorage.getItem('Vendor') == null) {
      this.Vendor = false;
    }

  }
  BuyItNowFuc() {
    this.AllListing = false;
    this.thisAuction = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.BuyItNow = true;
    this.Waitcall = true;

    // alert(this.CatName);
    //  console.log('Phones & Tablets')
    this.httpService.getBuyNowAuctionproducts(this.CatName, 'buyitnow').subscribe(
      data => {
        this.Trend = data.Results;
        if (this.Trend['totalItems'] === 0) {
          this.errormessage = true;
        }
      });
    this.Waitcall = false;

  }

  thisAuctionFuc() {
    this.AllListing = false;
    this.BuyItNow = false;
    this.AcceptOffer = false;
    this.errormessage = false;
    this.thisAuction = true;
    this.Waitcall = true;

    // alert(this.CatName);
    //  console.log('Phones & Tablets')
    this.httpService.getBuyNowAuctionproducts(this.CatName, 'auction').subscribe(
      data => {
        this.Trend = data.Results;
        if (this.Trend['totalItems'] === 0) {
          this.errormessage = true;
        }
      });
    // this.Waitcall = false;
    this.Waitcall = false;

  }




  TrashcartElement(Abc: any) {

    if (isPlatformBrowser(this.platformId)) {

      for (const tmp of this.CartedProduct.Results) {
        if (tmp.id === Abc) {
          console.log(tmp.id);
          this.GetAdd.DeleteTodoList(tmp.id).subscribe(data => {
            // alert(tmp.product.id)
            this.total = this.CartedProduct['Total Result']
            // this._shareData.watchtotal(this.total);
            this._shareData.watchtotal(this.total);
            // alert(this._shareData.watchtotal(this.total))
            // this._shareData.currentMessagetotal.subscribe(message => this.total = message)
            Swal.fire('Your offer has been Deleted.', '', 'success');
            this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

              this.CartedProduct = resSlidersData;
              this.total = this.CartedProduct['Total Result']
              this._shareData.watchtotal(this.total);
              // alert(this._shareData.watchtotal(this.total))

              this._shareData.currentMessagetotal.subscribe(message => this.total = message)
              console.log(this.CartedProduct.Results, 'cart')
            });

          });
          //  this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
          //localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
        }
      }
    }
  }
  ClickCheckOut() {

    this._nav.navigate(['/checkout2']);
  }

  // BothAbove() {
  //   console.log('I am In Product Both Above');
  //   this.BothCheck = true;
  //   this.Waitcall = true;
  //   this.errormessage = false;
  //   if (this.PriceStatus === false) {
  //     //  console.log('Phones & Tablets')
  //     this.httpService.getAllPhoneAndTabletProduct(1, this.CatName).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['totalItems'] === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   } else if (this.PriceStatus === true) {
  //     //  console.log('Phones & Tablets')
  //     this.httpService.getAllPhoneAndTabletProductWithPrice(1, this.Price1, this.Price2, this.CatName).subscribe(
  //       data => {
  //         this.Trend = data;
  //         if (this.Trend['totalItems'] === 0) {
  //           this.errormessage = true;
  //         }
  //       });
  //   }
  //   this.Waitcall = false;
  // }

  ProductType(abc: boolean) {
    console.log('I am In Product Type');
    this.ProType = true;
    this.ProStatus = abc;
    this.Waitcall = true;
    this.errormessage = false;
    if (this.PriceStatus === false) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithType(1, abc, this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    } else if (this.PriceStatus === true) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithFilter(1, this.Price1, this.Price2, abc, this.CatName).subscribe(
        data => {
          this.Trend = data;
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    }
    this.Waitcall = false;

  }
  acution_check(val) {
    // alert(val)
    this.Auctions = true;
    // this.ProductPrice(this.Price1, this.Price2)




  }
  fixed_check(val2) {
    // alert(val2)
    this.fixeds = false;
    // this.ProductPrice(this.Price1, this.Price2)

  }
  above_check() {
    this.bothabove = "ALL";
    // alert(this.bothabove)
    // this.ProductPrice(this.Price1, this.Price2)

  }

  ProductPrice(pk1: any, pk2: any) {
    console.log('I am In Product Price');


    this.PriceStatus = true;
    this.Price1 = pk1;
    this.Price2 = pk2;
    this.errormessage = false;
    this.Waitcall = true;
    // alert(Auction)
    // alert(fixeds)
    if (this.Auctions === true) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName,'', this.Auctions, pk2, pk1).subscribe(
        // Cat_Name,auction,maxvalue,minvalue
        data => {
          // this.Trend = data.Results;
          // product
          let ProductPriceprods;
          ProductPriceprods = data.Results;
          this.Trend = []
          for (let prods of ProductPriceprods) {
            this.Trend.push(prods.product);
            console.log(this.Trend.push(prods.product))
          }

          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
          console.log()
        });
    } else if (this.fixeds === false) {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName,'', this.fixeds, pk2, pk1).subscribe(
        data => {
          // this.Trend = data.Results;
          let ProductPriceprods;
          ProductPriceprods = data.Results;
          this.Trend = [];
          for (let prods of ProductPriceprods) {
            this.Trend.push(prods.product);
            console.log(this.Trend.push(prods.product))
          }
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    }
    else if (this.bothabove === "ALL") {
      //  console.log('Phones & Tablets')
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName, '',this.bothabove, pk2, pk1).subscribe(
        data => {
          // this.Trend = data.Results;
          let ProductPriceprods;
          ProductPriceprods = data.Results;
          this.Trend = [];
          for (let prods of ProductPriceprods) {
            this.Trend.push(prods.product);
            console.log(this.Trend.push(prods.product))
          }
          if (this.Trend['totalItems'] === 0) {
            this.errormessage = true;
          }
        });
    }
    this.Waitcall = false;
  }
  // }

}
