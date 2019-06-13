import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
 
import { HostListener } from '@angular/core';
import { AdService } from '../post-ad/ad.services';
// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { LoginService } from '../log-in/log-in.services';
import { CategoryServices } from "../category-detail/category-detail.services";
import { HomeService } from '../home/home.services';
import { SharedData } from '../shared-service';
import Swal from 'sweetalert2';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Trend: any = [];
  query: any;
  Courses: any;
  viewlogin;
  opSearch: number = 0;
  model: any = {};
  GetallCat: any = [];
  
  ValueRec: Boolean = false;
  GetUSerDOne: any[];
  cartcount: any = [];
  CartedProduct: any = [];
  ItemInCart: any;
  public filteredList = [];
  fname: any;
  public elementRef;
  Searchres = false;
  ProNav = false;
  GetallSubCat: any = [];
  GetallSubSubCat: any = [];
  total: any;
  totallist: any;
  WatchStatus;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private obj: LoginService,
    private PostAdd: AdService,

    private _nav: Router,
    private GetAdd: HomeService,
    public _shareData: SharedData,
    private httpService: CategoryServices,
    private buyer: BuyerDashboardServices) { }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log('Back button pressed');
  //   if (window.location.pathname === '/home') {
  //     window.location.reload();
  //   }
  // }
  go() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/home';
    }
  }
  TextChange(val) {
    // alert(val);
  }
  notgocart() {
    // UserName
    if (localStorage.getItem('UserName') !== null) {
      this._nav.navigate(['/checkout2'])
      // this.router.navigate(['/ChangePassword1']);
    }
    else if (localStorage.getItem('UserName') == null) {
      Swal.fire(
        'Add to cart!',
        'Your Shopping cart is empty',
        'error'
      );
    }
  }
  watchlist() {
    // [routerLink]="['/watch-Product']
    if (localStorage.getItem('UserName') !== null) {
      this._nav.navigate(['/watch-Product'])
      // this.router.navigate(['/ChangePassword1']);
    }
    else if (localStorage.getItem('UserName') == null) {
      Swal.fire(
        'Watch list!',
        'Your Watchlist  is empty',
        'error'
      );
    }
  }
  ngOnInit() {
    this.viewlogin = localStorage.getItem('Authorization');
    if (isPlatformBrowser(this.platformId)) {
      // console.log('fdsfsdfdsgj' + localStorage.getItem('UserID'));
      // this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

      //   this.CartedProduct = resSlidersData;
      //   this.cartcount= this.CartedProduct;
      //   console.log(this.CartedProduct.JSON['Total Result'],'cart')
      // });
      if (localStorage.getItem('UserID') !== null) {
        this._shareData.currentMessagetotal.subscribe(message => this.total = message)
        this._shareData.currentMessagetotalwatchlist.subscribe(messagess => this.totallist = messagess)
      }
      else {
        this.total = 0
        this.totallist = 0
      }
      if (this.viewlogin !== null) {

        this.GetAllProductcart()
        this.WatchStatuscount()
      }

      if (localStorage.getItem('UserID') !== null) {
        this.ValueRec = true;
        // if (response) {

          this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
            this.GetUSerDOne = resSlidersData;
            this.fname = this.GetUSerDOne['Fname'];
            this.ValueRec = true;

            //  console.log('saqib hanif');
            // console.log(  this.GetUSerDOne);
          });

        // } else {

        // }
        // this.obj.verify_tokenWithNoRedirict().subscribe((response) => {

         
        // },
        //   (err) => {
        //     console.log('ERROR:' + err);
        //     alert(err);
        //     // this._nav.navigate(['/login']);
        //   },
        //   () => {
        //   }
        // );


      }

      // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      //
      // if (this.CartedProduct) {
      //
      //   this.ItemInCart = this.CartedProduct['products'].length;
      //
      // } else {
      //   this.ItemInCart = 0;
      //
      // }


      this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);
      // this.PostAdd.GetAllSubCategories().subscribe(resSlidersData => this.GetallSubCat = resSlidersData);
      // this.PostAdd.GetAllSubSubCategories().subscribe(resSlidersData => this.GetallSubSubCat = resSlidersData);

    }
  }

  GetAllProductcart() {
    if (this.viewlogin !== null) {

      this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

        this.CartedProduct = resSlidersData;
        // console.log(this.CartedProduct.Results, 'cart')
        this.total = this.CartedProduct['Total Result']
        this._shareData.watchtotal(this.total);

        // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));

      });
    }
  }
  WatchStatuscount() {
    if (this.viewlogin !== null) {
      this.buyer.WatchStatus().subscribe(data => {
        // console.log('checkkkkkkkkkkk  ', data);
        this.WatchStatus = data
        this.totallist = this.WatchStatus['Total Result']
        this._shareData.watchtotallist(this.totallist);
        // alert( this.WatchStatus)

        // this.checkwatchstatus = this.WatchStatus;
        // alert(this.checkwatchstatus)
      });
    }

  }
  Phone() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Phones & Tablets' } })
  }
  Women() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Women\'s Fashion' } })
  }
  Men() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Men\'s Fashion' } })
  }
  TV() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'TV, Audio & Video' } })
  }
  Computing() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Computing & Laptops' } })
  }
  Home() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Home Appliances' } })
  }
  Sports() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Sports Goods' } })
  }
  Baby() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Baby & Kids' } })
  }
  Vehicles() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Vehicles & GPS' } })
  }
  Health() {
    this._nav.navigate(['/sameurl'], { queryParams: { CatName: 'Health & Beauty' } })
  }

  cartProduct() {
    this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
    // this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

    //   this.CartedProduct = resSlidersData;
    //   console.log(this.CartedProduct.Res,'cart')
    // });
    // this.cartcount= this.cartProduct;
    if (this.CartedProduct) {

      return this.CartedProduct.Results.length;

    } else {
      return 0
    }

  }

  closeSearch1(event) {
    // console.log('Event is: ', event)
    if (event.key === "Escape") {
      if (this.opSearch === 1) {
        this.opSearch = 0;
        this.query = '';
        this.Trend = '';
        $('#wrapper').removeClass('search-active');
      }
    }
  }
  closeSearch() {
    if (this.opSearch === 1) {
      this.opSearch = 0;
      this.query = '';
      this.Trend = '';
      $('#wrapper').removeClass('search-active');
    }
  }
  ProductNav() {
    this.ProNav = !this.ProNav;
  }
  openSearch() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
      this.opSearch = 1;
      $('#wrapper').addClass('search-active');
      setTimeout(function () {
        $('#textsearch1').focus();
      }, 200);
    }
  }

  ValueReset() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.obj.loged_out();
      this.ValueRec = false;
      this._nav.navigate(['/login']);
    }
  }

  loginCheck() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('UserID')) {
        return true
      } else {
        return false
      }
    }
  }


  gotodashboard() {
    if (isPlatformBrowser(this.platformId)) {
     
      this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {

        if (resSlidersData['Vendor'] === true) {
          this._nav.navigate(['/dashboard']);
        } else {


          this._nav.navigate(['/buyer-dashboard']);
        }
      }
      );
    }
  }


  navigate(search) {

    if (search) {

      // console.log('search value is', search)
      this.Searchres = true;
      this.httpService.getAllSearchProducts(1, search).subscribe(
        data => {
          this.Trend = data;
        });
    } else {
      this.Trend.results = null;
      this.Trend.totalItems = 0;
      this.Searchres = false;
    }
    //
    // if (action==1) {
    //   if (event.key === "Enter") {
    //     this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
    // }
    // } else {
    // this._nav.navigate(['/search-results'], { queryParams: { Search: search }});
    // }
  }



}
