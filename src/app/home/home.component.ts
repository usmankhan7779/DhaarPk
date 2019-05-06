import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HomeService } from './home.services';
import { OwlCarousel } from "ngx-owl-carousel";
import { AdService } from '../post-ad/ad.services';
import { CategoryServices } from "../category-detail/category-detail.services";
import { split } from "ts-node/dist";
import { ActiveAdServices } from "../active-ad/active-ad.services";
// import { PhotosObj, Photos } from './_modal';
import { PagerService } from '../pager.service';
declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // public brands= [
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Hot Deals  of day',
  //     link:'all'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Ebay'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Walmart'
  //   },
  //   {
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'Groupon'
  //   },{
  //     image:'../../assets/images/slider/Slide1.png',
  //     name:'Deals of day',
  //     link:'BestBuy'
  //   },
  // ];

  GetallCat: any = [];
  ServrUrl: string = 'assets/assets2/images/category/';
  public GetallPhoneProduct: any = [];
  getcomputinglaptopsproduct: any = [];
  WomenFashionProducts: any = [];
  MenFashionProducts: any = [];
  getTvAudioVideoProduct: any = [];
  GetALLProductss: any = [];
  gethomeappliancesproduct: any = [];
  GetALLFeaturedProductss: any = [];
  GetALLAuctionProductss: any = [];
  GetALLBuyNowProductss: any = [];
  GetALLLikeforyou: any = [];
  HotDealProducts: any = [];
  RecommendedProducts: any = [];
  ViewedProducts: any = { "products": [] };
  WatchedProducts: any = [];
  Tmp_ProID_Array: any = [];
  // imageurls = 'https://storage.dhaar.pk/Category/SliderImages/';
  imageurls = 'https://storage.dhaar.pk/final/';
  usercheck = false;
  ourproduct: boolean = false;
  Tmp_ProID_Array2: {
    ProID: any;
    Price: any;
  }[];
  ProID: string;
  resultProduct: any = [];
  viewtimer: any = [];
  viewlogin;
  // intervalId = 0;
  message = '';
  // seconds = 59;
  PicList: any = [];
  DbDate: string;
  Title: any;
  ActiveProduct: any = [];
  page: number = 1;
  Timeclose = false;
  product: any;
  AuctionProductPrice: number;
  AuctionTest = true;
  AuctionDayDB: string;
  Getphoto: any = [];
  GetallphotsProduct: any = [];
  pager: any = {};
  ProPics: any = [];
  MinimumbestOffer: any;
  soldfix = false;
  BidingProduct: any[] = [];
  LocalStoreName: any;
  ProPDes: any = [];
  selectedImage;
  user: any;
  seconds: any;
  Solddd = false;
  minutes: any;
  hours: any;
  element: HTMLElement;
  days: any;
  // myPhotosList: Photos[] = [];
  slideConfig;
  images = [
    "assets/images/slider/5-min.png",
    "assets/images/slider/menslider.png",
    "assets/images/slider/womenslider.png",
    "assets/images/slider/2-min.png",
    "assets/images/slider/4-min.png"
  ];
  categories = [
    {
      "image": "assets/images/phone-and-tablet-min.png",
      "name": "Phones & Tablets",
    },
    {
      "image": "assets/images/Mens-min.png",
      "name": "Men\'s Fashion",
    },
    {
      "image": "assets/images/Womens-2-min.png",
      "name": "Women\'s Fashion",
    },
    {
      "image": "assets/images/Audio-video-2-min.png",
      "name": "TV, Audio & Video",
    },
    {
      "image": "assets/images/Computing-laptop-min.png",
      "name": "Computing & Laptops",
    },
    {
      "image": "assets/images/Home-Appliance-min.png",
      "name": "Home Appliances",
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private GetProducts: HomeService,
    private GetCat: AdService,
    private pagerService: PagerService,
    private Category: CategoryServices,
    // private GetWatch: ActiveAdServices,
    private httpService: ActiveAdServices) {


  }

  ngOnInit() {
    this.viewlogin = localStorage.getItem('Authorization');
    if (isPlatformBrowser(this.platformId)) {


      window.scrollTo(0, 0);
      this.ProductsAllCat();
      this.GetAllBuyNowproduct();
      this.GetAcutionProduct();
      this.GetFreateuredProducts();
      this.Getjustlikeforyou(1);
      this.PhoneandTablet();
      this.CategorySlider();
      // this.HotDealSlider();
      this.RecommendedSlider();
      this.ViewedItemSlider();
      if (localStorage.getItem('UserID')) {
        this.usercheck = true;
        if (this.viewlogin !== null) {
          this.WatchedItemSlider();
        }
      }
    }
  }

  // GetProductsfromAllCatPageNumber
  PhoneTablet() {
    this.GetProducts.get_PhoneAndTabletProduct_ProductById(this.ProID).subscribe(resSlidersData => {
      this.resultProduct = resSlidersData;
      this.Title = this.resultProduct['P_Title']
      // alert(this.resultProduct.inWishList)
      // this.ourproduct = true;
      console.log('Description of product is:', this.resultProduct['P_Des']);
      this.ProPDes = this.resultProduct['P_Des'].split('\n');

      this.ProPics = this.resultProduct['Pic'].split(',');
      console.log(this.ProPics[0])

      this.selectedImage = this.ProPics[0];
      console.log(this.selectedImage);
      for (let i = 0; i < this.ProPics.length - 1; i++) {
        this.PicList[i] = this.ProPics[i + 1];
      }

      console.log('Pics Before:', this.ProPics);
      console.log('Pics after:', this.PicList);


      console.log('Pics are:', this.ProPics);
      //  alert(this.resultProduct['StoreName'])
      //  alert(localStorage.getItem('StoreName'))
      // if (this.resultProduct['StoreName'] === localStorage.getItem('StoreName') ) {
      this.ourproduct = true;

      // }

      if (this.resultProduct.Quantity <= 0) {
        this.soldfix = true;
      }
      console.log('Product attributes', this.resultProduct);
      this.LocalStoreName = this.resultProduct.StoreName;
      this.MinimumbestOffer = this.resultProduct.Addbestoffer;
      if (this.resultProduct.Auction) {
        this.DbDate = this.resultProduct.CreatedDate;
        this.AuctionDayDB = this.resultProduct.AuctionListing;
        const auctiondays = +this.AuctionDayDB * 86400000;
        console.log('Auction days:', auctiondays);
        const time0 = new Date();
        console.log('time0:', time0);
        const time1 = new Date(this.DbDate);
        console.log('time1:', time1);
        const time3 = ((time1.getTime() - time0.getTime()) + auctiondays);
        console.log('time3:', time3);
        console.log('Bidding Products Are:', this.BidingProduct)
        if (time3 <= 0 && this.BidingProduct.length !== 0) {
          console.log('This Bidder wins:', this.BidingProduct[0]);
          this.user = this.BidingProduct[0]['User_Id']
          this.product = this.BidingProduct[0]['Product_Id']
          this.GetProducts.InsertwinnerBid(this.user, this.product).subscribe();
        }
        // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
        let x = time3 / 1000;
        this.seconds = Math.floor(x % 60);
        console.log('Seconds are:', this.seconds);
        x /= 60;
        this.minutes = Math.floor(x % 60);
        console.log('Minutes are:', this.minutes);
        x /= 60;
        this.hours = Math.floor(x % 24);
        console.log('Hours are:', this.hours);
        x /= 24;
        this.days = Math.floor(x);
        console.log('Days are:', this.days);


      }

    });
  }
  GetProductsfromAllCatPageNumber(page: number) {

    if (this.viewlogin !== null) {

      this.GetProducts.GetProductsfromAllCatPageNumber(page).subscribe(resSlidersData => {

        let demoprods;
        demoprods = resSlidersData.Results;

        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }
      });
    }
    else if (this.viewlogin == null) {

      this.GetProducts.GetProductsfromAllCatPageNumber(page).subscribe(resSlidersData => {


        let demoprods;
        demoprods = resSlidersData.Results;

        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }



      });

    }

  }

  ProductsAllCat() {

    if (this.viewlogin !== null) {

      this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

        let demoprods;
        demoprods = resSlidersData.Results;

        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
          // this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }




      });
    }
    else if (this.viewlogin == null) {

      this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {
        // this.resultProduct = resSlidersData.Results
        this.viewtimer = resSlidersData.Results;
        this.resultProduct = this.viewtimer.product;
        let demoprods;
        demoprods = resSlidersData.Results;

        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
          // this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
          
          // this.DbDate = prods.product.CreatedDate;
        
          // this.AuctionDayDB = prods.product.AuctionListing;
          // const auctiondays = +this.AuctionDayDB * 86400000;
          // console.log('Auction days:', auctiondays);
          // const time0 = new Date();
          // console.log('time0:', time0);
          // const time1 = new Date(this.DbDate);
          // console.log('time1:', time1);
          // const time3 = ((time1.getTime() + auctiondays) - time0.getTime());
          // // alert( time3);
          // console.log('time3:', time3);
          
          // // if (time3 <= 0 && this.BidingProduct.length !== 0) {
          // //   // alert('time is less than time3')
          // //   console.log('This Bidder wins:', this.BidingProduct[0]);
          // //   this.user = this.BidingProduct[0]['User_Id']
          // //   this.product = this.BidingProduct[0]['Product_Id']
          // //   this.GetProducts.InsertwinnerBid(this.user, this.product).subscribe();
          // // }
          // // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
          // let x = time3 / 1000;
          // this.seconds = Math.floor(x % 60);
          // // alert( this.seconds);
          // console.log('Seconds are:', this.seconds);
          // x /= 60;
          // this.minutes = Math.floor(x % 60);
          // // alert(this.minutes);
          // console.log('Minutes are:', this.minutes);
          // x /= 60;
          // this.hours = Math.floor(x % 24);
          // // alert(this.hours);
          // console.log('Hours are:', this.hours);
          // x /= 24;
          // this.days = Math.floor(x);
          // // alert( this.days);
          // console.log('Days are:', this.days);
          // if (this.seconds > 0 || this.minutes > 0 || this.hours > 0 || this.days > 0) {
          //   setInterval(() => {
          //     this.timer1(this.element);
          //     console.log(this.timer1(this.element));
          //     // alert('dd');
          //   }, 1000);

          // }
          // else {
          //   this.seconds = '00';
          //   this.minutes = '00';
          //   this.hours = '00';
          //   this.days = '00';
          // }

        }
        // this.Title = this.resultProduct['P_Title']
        // alert(this.resultProduct.inWishList)
        // this.ourproduct = true;
        // console.log('Description of product is:', this.resultProduct['P_Des']);
        // this.ProPDes = this.resultProduct['P_Des'].split('\n');

        // this.ProPics = this.resultProduct['Pic'].split(',');
        // console.log(this.ProPics[0])

        // this.selectedImage = this.ProPics[0];
        // console.log(this.selectedImage);
        // for (let i = 0; i < this.ProPics.length - 1; i++) {
        // this.PicList[i] = this.ProPics[i + 1];
        // }

        // console.log('Pics Before:', this.ProPics);
        // console.log('Pics after:', this.PicList);


        // console.log('Pics are:', this.ProPics);
        //  alert(this.resultProduct['StoreName'])
        //  alert(localStorage.getItem('StoreName'))
        // if (this.resultProduct['StoreName'] === localStorage.getItem('StoreName') ) {
        // this.ourproduct = true;

        // }

        // if (this.resultProduct.Quantity <= 0) {
        //   this.soldfix = true;
        // }
        // console.log('Product attributes', this.resultProduct);
        // this.LocalStoreName = this.resultProduct.StoreName;
        // this.MinimumbestOffer = this.resultProduct.Addbestoffer;
        // if (this.resultProduct.Auction) {


        // }




      });

    }

  }

  GetAllBuyNowproduct() {

    if (this.viewlogin !== null) {
      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersDatass => {


        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;

        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
        }


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersDatass => {


        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;

        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
        }


      });
    }
  }
  GetBuyNowProductsfromAllCatPageNumber(page: number) {

    if (this.viewlogin !== null) {
      this.GetProducts.GetBuyNowProductsfromAllCatPageNumber(page).subscribe(resSlidersDatass => {


        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;

        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersDatass['Results'], page, 10);
        }


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetBuyNowProductsfromAllCatPageNumber(page).subscribe(resSlidersDatass => {


        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;

        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersDatass['Results'], page, 10);
        }


      });
    }
  }
  GetAcutionProduct() {
    if (this.viewlogin !== null) {

      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {


        let demoactuprods;
        demoactuprods = resSlidersData.Results;

        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
        }



      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {


        let demoactuprods;
        demoactuprods = resSlidersData.Results;

        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
        }

      });
    }
  }
  GetAuctionProductsfromAllCatPageNumber(page: number) {
    if (this.viewlogin !== null) {

      this.GetProducts.GetAuctionProductsfromAllCatPageNumber(page).subscribe(resSlidersData => {


        let demoactuprods;
        demoactuprods = resSlidersData.Results;

        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }



      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAuctionProductsfromAllCatPageNumber(page).subscribe(resSlidersData => {


        let demoactuprods;
        demoactuprods = resSlidersData.Results;

        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }

      });
    }
  }

  Getjustlikeforyou(page: number) {

    this.GetProducts.Getlikeforyou().subscribe(resSlidersData => {

      let demoactuprods;
      demoactuprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demoactuprods)
      for (let prods of demoactuprods) {
        this.GetALLLikeforyou.push(prods.product);
        // }
        this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
      }

    });
  }
  GetjustlikeforyouPageNumber(page: number) {

    this.GetProducts.GetlikeforyouPageNumber(page).subscribe(resSlidersData => {

      let demoactuprods;
      demoactuprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demoactuprods)
      for (let prods of demoactuprods) {
        this.GetALLLikeforyou.push(prods.product);
        // }
        this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
      }

    });
  }
  GetAllFeaturedProductsPageNumber(page: number) {

    if (this.viewlogin !== null) {

      this.GetProducts.GetAllFeaturedProductsPageNumber(page).subscribe(resSlidersData => {

        // this.GetALLAuctionProductss = resSlidersData.Results;
        let demofreprods;
        demofreprods = resSlidersData.Results;

        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }
        console.log(this.GetALLFeaturedProductss);


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAllFeaturedProductsPageNumber(page).subscribe(resSlidersData => {

        let demofreprods;
        demofreprods = resSlidersData.Results;

        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
          this.pager = this.pagerService.getPager(resSlidersData['Results'], page, 10);
        }

      });
    }
  }
  GetFreateuredProducts() {

    if (this.viewlogin !== null) {

      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        // this.GetALLAuctionProductss = resSlidersData.Results;
        let demofreprods;
        demofreprods = resSlidersData.Results;

        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
        }
        console.log(this.GetALLFeaturedProductss);


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        let demofreprods;
        demofreprods = resSlidersData.Results;

        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
        }

      });
    }
  }
  PhoneandTablet() {

    this.GetProducts.PhoneandTablet("Phones & Tablets").subscribe(resSlidersDatasss => {

      this.GetallPhoneProduct = resSlidersDatasss.Results;
    });
  }
  menfashion() {
    this.GetProducts.MenFashion("Men's Fashion").subscribe(resSlidersData => {


      let demomenprods;
      demomenprods = resSlidersData.Results;

      for (let prods of demomenprods) {
        this.MenFashionProducts.push(prods.product);
      }
    });
  }
  tv() {
    this.GetProducts.TV("TV, Audio & Video").subscribe(resSlidersData => {

      let demotvprods;
      demotvprods = resSlidersData.Results;

      for (let prods of demotvprods) {
        this.getTvAudioVideoProduct.push(prods.product);
      }
    });

  }
  computer() {
    this.GetProducts.Computer("Computing & Laptops").subscribe(resSlidersData => {


      let democompprods;
      democompprods = resSlidersData.Results;

      for (let prods of democompprods) {
        this.getcomputinglaptopsproduct.push(prods.product);
      }
    });

  }
  home() {
    this.GetProducts.Home("Home Appliances").subscribe(resSlidersData => {


      let demohomwprods;
      demohomwprods = resSlidersData.Results;

      for (let prods of demohomwprods) {
        this.gethomeappliancesproduct.push(prods.product);
      }
    });

  }


  womenFashion() {

    this.GetProducts.womenFashion("Women's Fashion").subscribe(resSlidersData => {

      let demowomprods;
      demowomprods = resSlidersData.Results;

      for (let prods of demowomprods) {
        this.WomenFashionProducts.push(prods.product);
      }
    });
  }


  CategorySlider() {
    this.GetCat.GetAllCategories().subscribe(data => {
      this.GetallCat = data;
      console.log('Categories Are:', this.GetallCat);

      $('.homeSlider').fadeOut(0);
      if (this.GetallCat) {
        setTimeout(function () {
          $('.homeSlider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: '<button class="leftRs" style="left: 30px;"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="rightRs" style="right: 30px;"><i class="fa fa-angle-right"></i></button>',

            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.homeSlider').fadeIn(500).delay(200);
    });
  }

  RecommendedSlider() {
    if (this.viewlogin !== null) {
      this.Category.getRecommended().subscribe(resSlidersData => {
        this.RecommendedProducts = resSlidersData.Results;
        $('.recommendedslider').fadeOut(0);
        if (this.RecommendedProducts) {
          setTimeout(function () {
            $('.recommendedslider').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 1,
              autoplay: true,
              prevArrow: '<button class="leftRs" style="left: 30px;"><i class="fa fa-angle-left"></i></button>',
              nextArrow: '<button class="rightRs" style="right: 30px;"><i class="fa fa-angle-right"></i></button>',
              responsive: [
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: 3,
                    infinite: true
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 639,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }

              ]
            });
          }, 0);
        }
        $('.recommendedslider').fadeIn(500).delay(200);
      });
    }

  }


  ViewedItemSlider() {
    this.ViewedProducts = JSON.parse(localStorage.getItem('ViewedItem'));
    if (this.ViewedProducts === null) {
      console.log('Viewed Products Are:', this.ViewedProducts);
    } else if (this.ViewedProducts !== null) {
      for (const tmp1 of this.ViewedProducts['products']) {
        tmp1['Pic'] = tmp1['Pic'].split(',')[0];
      }
      this.ViewedProducts = this.ViewedProducts['products'];
      $('.viewedslider').fadeOut(0);
      if (this.ViewedProducts.length >= 5) {
        setTimeout(function () {
          $('.viewedslider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRs" ><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="rightRs" ><i class="fa fa-angle-right"></i></button>',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }

            ]
          });
        }, 0);
      }
      $('.viewedslider').fadeIn(500).delay(200);
      // });
    }
  }

  WatchedItemSlider() {
    if (this.viewlogin !== null) {
      this.httpService.getwatchproducts().subscribe(resSlidersData => {
        this.WatchedProducts = resSlidersData.Results;
        $('.watchslider').fadeOut(0);
        if (this.WatchedProducts.totalItems >= 5) {
          setTimeout(function () {
            $('.watchslider').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 1,
              autoplay: true,
              prevArrow: '<button class="leftRsBanner">&lt;</button>',
              nextArrow: '<button class="rightRsBanner">&lt;</button>',
              responsive: [
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: 3,
                    infinite: true
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 639,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }

              ]
            });
          }, 0);
        }
        $('.watchslider').fadeIn(500).delay(200);
      });
    }
  }

  // timer(end_date: string) {

  //   return ((new Date(end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0);
  // }


  CheckFOrDifferent(ProID: string) {
    console.log('PrOID: ' + ProID);
    if (this.Tmp_ProID_Array.length === 0) {
      console.log('this.Tmp_ProID_Array.length' + this.Tmp_ProID_Array.length);
      this.Tmp_ProID_Array.push(ProID);

      // this.Tmp_ProID = ProID;
      this.AuctionTest = true;
      return true;
    } else if (this.Tmp_ProID_Array.indexOf(ProID) > -1) {
      console.log('this.exist' + this.Tmp_ProID_Array.indexOf(ProID));
      this.AuctionTest = false;
      return false;
    } else {

      console.log('this.Tmp_ProID_Array.length beofre: ' + this.Tmp_ProID_Array.length);
      this.Tmp_ProID_Array.push(ProID);
      console.log('this.Tmp_ProID_Array.length after: ' + this.Tmp_ProID_Array.length);

      this.AuctionTest = true;
      return true;

    }
  }
  timer1(element: HTMLElement) {

    if (!this.Timeclose) {
      // alert(this.Timeclose)
      this.seconds -= 1;
      if (this.seconds <= 0) {
        this.seconds = 59
        this.minutes -= 1
        if (this.minutes <= 0) {
          this.hours -= 1
          this.minutes = 59
          if (this.hours <= 0) {
            this.days -= 1
            this.hours = 23
            if (this.days <= 0) { }
          }
        }
      }
      // if (this.seconds <= 0) {
      //   // alert('001');
      //   this.seconds = 59;
      //   this.minutes -= 1;
      //   if (this.minutes <= 0) {
      //     // alert('002');
      //     this.minutes = 59;
      //     this.hours -= 1;
      //     if (this.hours <= 0) {
      //       // alert('003');
      //       this.hours = 23;
      //       this.days -= 1;
      //       if (this.days <= 0) {
      //         // alert('4s00');
      //         this.Timeclose = true;
      //         // this.Solddd = true;

      //         // this.seconds = 0;
      //         // this.minutes = 0;
      //         // this.hours = 0;
      //         // this.days = 0;
      //       }

      //     }
      //   }

      // }

    }
    else {
      // this.jobStatus=false;
      // alert('sdsddsf');
    }
  }
}

