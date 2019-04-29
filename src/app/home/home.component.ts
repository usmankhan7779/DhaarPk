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
  imageurls = 'https://storage.dhaar.pk/Category/SliderImages/';
  usercheck = false;
  Tmp_ProID_Array2: {
    ProID: any;
    Price: any;
  }[];
  viewlogin;
  intervalId = 0;
  message = '';
  seconds = 59;
  ActiveProduct: any = [];
  page: number = 1;
  AuctionProductPrice: number;
  AuctionTest = true;
  Getphoto: any = [];
  GetallphotsProduct: any = [];
  pager: any = {};
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
      this.Getjustlikeforyou();
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
  ProductsAllCat() {
    // page: number
    if (this.viewlogin !== null) {

      this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

        let demoprods;
        demoprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoprods)
        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
        }
        // console.log(this.GetALLProductss);



      });
    }
    else if (this.viewlogin == null) {

      this.GetProducts.GetProductsfromAllCat().subscribe(resSlidersData => {

        // this.GetALLProductss = resSlidersData.Results;
        // .product
        let demoprods;
        demoprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoprods)
        for (let prods of demoprods) {
          this.GetALLProductss.push(prods.product);
        }
        // console.log(this.GetALLProductss);

        // console.log(this.GetALLProductss, 'response')


      });

    }

  }

  GetAllBuyNowproduct() {
    // (localStorage.getItem('UserID') !== null)
    if (this.viewlogin !== null) {
      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersDatass => {

        
        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demobuyprods)
        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
        }
        // console.log(this.GetALLProductss);

      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetBuyNowProductsfromAllCat().subscribe(resSlidersDatass => {

        // this.GetALLBuyNowProductss = resSlidersDatass.Results;
        // alert(this.GetALLAuctionProductss)
        let demobuyprods;
        demobuyprods = resSlidersDatass.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demobuyprods)
        for (let prods of demobuyprods) {
          this.GetALLBuyNowProductss.push(prods.product);
        }
        // console.log(this.GetALLProductss);

      });
    }
  }
  GetAcutionProduct() {
    if (this.viewlogin !== null) {
      // if (page < 1 || page > this.pager.totalPages) {
      //   return;
      // }
      // alert(localStorage.getItem('Authorization'))
      // this.GetALLProductss=undefined;
      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {

        // this.GetALLAuctionProductss = resSlidersData.Results;
        let demoactuprods;
        demoactuprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoactuprods)
        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
        }
        // console.log(this.GetALLAuctionProductss);


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAuctionProductsfromAllCat().subscribe(resSlidersData => {

        // this.GetALLAuctionProductss = resSlidersData.Results;
        let demoactuprods;
        demoactuprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoactuprods)
        for (let prods of demoactuprods) {
          this.GetALLAuctionProductss.push(prods.product);
        }

      });
    }
  }
  Getjustlikeforyou() {

    this.GetProducts.Getlikeforyou().subscribe(resSlidersData => {

      // this.GetALLLikeforyou = resSlidersData.Results;
      let demoactuprods;
        demoactuprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demoactuprods)
        for (let prods of demoactuprods) {
          this.GetALLLikeforyou.push(prods.product);
        }

    });
  }

  GetFreateuredProducts() {
    // this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

    //   this.GetALLFeaturedProductss = resSlidersData;
    // });
    if (this.viewlogin !== null) {
      // if (page < 1 || page > this.pager.totalPages) {
      //   return;
      // }
      // alert(localStorage.getItem('Authorization'))
      // this.GetALLProductss=undefined;
      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        // this.GetALLAuctionProductss = resSlidersData.Results;
        let demofreprods;
        demofreprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demofreprods)
        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
        }
        console.log(this.GetALLFeaturedProductss);


      });
    }
    else if (this.viewlogin == null) {
      this.GetProducts.GetAllFeaturedProducts().subscribe(resSlidersData => {

        // this.GetALLFeaturedProductss = resSlidersData.Results;
        let demofreprods;
        demofreprods = resSlidersData.Results;
        //this.GetALLProductss= resSlidersData.Results;
        // console.log(demofreprods)
        for (let prods of demofreprods) {
          this.GetALLFeaturedProductss.push(prods.product);
        }

      });
    }
  }
  PhoneandTablet() {

    this.GetProducts.PhoneandTablet("Phones & Tablets").subscribe(resSlidersDatasss => {
      // console.log(resSlidersDatasss)
      this.GetallPhoneProduct = resSlidersDatasss.Results;
    });
  }
  menfashion() {
    this.GetProducts.MenFashion("Men's Fashion").subscribe(resSlidersData => {

      // this.MenFashionProducts = resSlidersData.Results;
      let demomenprods;
      demomenprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demomenprods)
      for (let prods of demomenprods) {
        this.MenFashionProducts.push(prods.product);
      }
    });
  }
  tv() {
    this.GetProducts.TV("TV, Audio & Video").subscribe(resSlidersData => {

      // this.getTvAudioVideoProduct = resSlidersData.Results;
      let demotvprods;
      demotvprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demotvprods)
      for (let prods of demotvprods) {
        this.getTvAudioVideoProduct.push(prods.product);
      }
    });

  }
  computer() {
    this.GetProducts.Computer("Computing & Laptops").subscribe(resSlidersData => {

      // this.getcomputinglaptopsproduct = resSlidersData.Results;
      let democompprods;
      democompprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(democompprods)
      for (let prods of democompprods) {
        this.getcomputinglaptopsproduct.push(prods.product);
      }
    });

  }
  home() {
    this.GetProducts.Home("Home Appliances").subscribe(resSlidersData => {

      // this.gethomeappliancesproduct = resSlidersData.Results;
      let demohomwprods;
      demohomwprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demohomwprods)
      for (let prods of demohomwprods) {
        this.gethomeappliancesproduct.push(prods.product);
      }
    });

  }


  womenFashion() {

    this.GetProducts.womenFashion("Women's Fashion").subscribe(resSlidersData => {
      // console.log(resSlidersData)
      // this.WomenFashionProducts = resSlidersData.Results;
      let demowomprods;
      demowomprods = resSlidersData.Results;
      //this.GetALLProductss= resSlidersData.Results;
      // console.log(demowomprods)
      for (let prods of demowomprods) {
        this.WomenFashionProducts.push(prods.product);
      }
    });
  }


  // onSuccess(resSlidersData) {
  //   console.log(resSlidersData);
  //   if (resSlidersData != null) {
  //     resSlidersData.forEach(item => {
  //       this.myPhotosList.push(new PhotosObj(item));
  //     });
  //   }
  // }
  // onScroll()
  // {
  //   console.log("Scrolled");
  //   this.page = this.page + 1;
  //   this.getPhotos(1);
  // }
  // nextClick() {
  //   console.log(this.model);
  //   if (this.model.pageno < this.model.totalpages) {
  //     this.model.pageno = this.model.pageno + 1; // (parseInt(this.model.pageno, 10) + 1).toString();
  //     this.newService.fetchJobByAdvanceSearch(this.model).subscribe(data => {
  //       for (let i = 0; i < data.jobs.length; i++) {
  //         this.jobsList.push(data.jobs[i]);
  //       }
  //     });
  //   }
  // }
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
            autoplay: true,
            prevArrow: '<button class="leftRs">&lt;</button>',
            nextArrow: '<button class="rightRs">&lt;</button>',
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

  // HotDealSlider() {
  //   this.GetProducts.getcomputinglaptopsproduct8().subscribe(resSlidersData => {
  //     this.HotDealProducts = resSlidersData;
  //     $('.hotslider').fadeOut(0);
  //     if (this.HotDealProducts.length >= 5) {
  //       setTimeout(function () {
  //         $('.hotslider').slick({
  //           infinite: true,
  //           slidesToShow: 5,
  //           slidesToScroll: 1,
  //           autoplay: true,
  //           prevArrow: '<button class="leftRsBanner">&lt;</button>',
  //           nextArrow: '<button class="rightRsBanner">&lt;</button>',
  //           responsive: [
  //             {
  //               breakpoint: 1199,
  //               settings: {
  //                 slidesToShow: 3,
  //                 infinite: true
  //               }
  //             },
  //             {
  //               breakpoint: 767,
  //               settings: {
  //                 slidesToShow: 2,
  //               }
  //             },
  //             {
  //               breakpoint: 639,
  //               settings: {
  //                 slidesToShow: 1,
  //                 slidesToScroll: 1
  //               }
  //             }

  //           ]
  //         });
  //       }, 0);
  //     }
  //     $('.hotslider').fadeIn(500).delay(200);
  //   });
  // }
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
      $('.recommendedslider').fadeIn(500).delay(200);
    });
  }
  // else if (this.viewlogin == null) {

  // }
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

  timer(end_date: string) {

    return ((new Date(end_date).getTime().valueOf() - new Date().getTime().valueOf()) / (1000)).toFixed(0);
  }


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
}

