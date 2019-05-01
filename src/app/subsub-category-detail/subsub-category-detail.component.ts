import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CategoryServices } from '../category-detail/category-detail.services';


import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { HomeService } from '../home/home.services';
import { PagerService } from '../pager.service';
import { SharedData } from '../shared-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-subsub-category-detail',
  templateUrl: './subsub-category-detail.component.html',
  styleUrls: ['./subsub-category-detail.component.css']
})
export class SubsubCategoryDetailComponent implements OnInit {
  Vendor;
  r: any;
  pageno: any;
  sub: any;
  PriceStatus = false;
  pager: any = {};
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
  bothabove;
  fixeds;
  BuyItNow = false;
  AllListing = true;
  Auction = false;
  thisAuction = false;
  AcceptOffer = false;
  total: any;
  Price1: string;
  Price2: string;
  Auctions ;
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               public _shareData: SharedData,
               private pagerService: PagerService,
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
        alert(this.Subcat)


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

        this.viewsubsubcat(1)
     
       
      });
      if (this.CatName === '0' || this.Subcat === '0') {
        this._nav.navigate(['/404']);
      }
      this.vendors();
      if (localStorage.getItem('UserName') != null) {
        this.viewaddtocart();
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



      // this.httpService.GetphotoById().subscribe(resSlidersData => {
      //   this.GetPhotos = resSlidersData;
      //
      // });
    }
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

  viewaddtocart() {
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
viewsubsubcat(page:number){
  this.GetProducts.subsubcatmenu(this.CatName,this.Subcat,page).subscribe(resSlidersData => {
    console.log(resSlidersData)
    // this.Trend = resSlidersData.Results;
    let demoprods;
      demoprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      console.log(demoprods)
      for (let prods of demoprods) {
        this.Trend.push(prods.product);
      }
    if (this.Trend['Total Result'] === 0) {
      this.errormessage = true;
    }
    this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
  });
}
  message() {
    this.errormessage = !this.errormessage;
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

  // TrashcartElement(Abc: any) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     for (const tmp of this.CartedProduct['products']) {
  //       if (tmp.ProductID === Abc) {

  //         this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1);
  //         localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));


  //       }

  //     }
  //     this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
  //     if (this.CartedProduct === null) {
  //       this.Cart = true;
  //     }
  //     this.Total = 0;
  //     for (const tmp of this.CartedProduct['products']) {
  //       this.Total = this.Total + (tmp.FixedPrice * tmp.itemsqty);
  //     }
  //   }

  // }
  
  TrashcartElement(Abc: any) {

    if (isPlatformBrowser(this.platformId)) {

      for (const tmp of this.CartedProduct.Results) {
        if (tmp.id === Abc) {
          console.log(tmp.id);
          this.GetProducts.DeleteTodoList(tmp.id).subscribe(data => {
            // alert(tmp.product.id)
            this.total = this.CartedProduct['Total Result']
            // this._shareData.watchtotal(this.total);
            this._shareData.watchtotal(this.total);
            // alert(this._shareData.watchtotal(this.total))
            // this._shareData.currentMessagetotal.subscribe(message => this.total = message)
            Swal.fire('Your offer has been Deleted.', '', 'success');
            this.GetProducts.GetAllProductcart().subscribe(resSlidersData => {

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
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName,this.Subcat, this.Auctions, pk2, pk1).subscribe(
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
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName,this.Subcat, this.fixeds, pk2, pk1).subscribe(
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
      this.httpService.getAllPhoneAndTabletProductWithPrice(this.CatName,this.Subcat, this.bothabove, pk2, pk1).subscribe(
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
  // ProductPrice(pk1: any, pk2: any) {

  //     //  console.log('Phones & Tablets')
  //     this.httpService.getAllSubSubPhoneAndTabletProductPrice(1, this.Subcat, pk1, pk2).subscribe(
  //       data => {
  //         this.Trend = data;
  //       });
  // }
}
