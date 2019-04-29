import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { ActiveAdServices } from "../active-ad/active-ad.services";
import Swal from 'sweetalert2';
import { HomeService } from '../home/home.services';

@Component({
  selector: 'app-watch-product',
  templateUrl: './watch-product.component.html',
  styleUrls: ['./watch-product.component.scss']
})
export class WatchProductComponent implements OnInit {

  ActiveProduct: any = [];
  errormessage = false;
  SessionstoreName: any;
  seller = false;
  r: any;
  pageno: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private _nav: Router,
    private GetAdd: HomeService,
    private httpService: ActiveAdServices) {
  }
  pageTrendChanged(event) {
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.GetallWatchProducts(this.pageno, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      // this.SessionstoreName= localStorage.getItem('StoreName');
      // if (this.SessionstoreName === null) {
      //   this.seller = false;
      // } else {
      //   this.seller = true;
      // }
      if (localStorage.getItem('UserID') === null) {

        this._nav.navigate(['/login']);
      }
      // 1, localStorage.getItem('UserID')
      this.httpService.getwatchproducts().subscribe(data => {
        this.ActiveProduct = data.Results;
        console.log(this.ActiveProduct.ProductID)
        if (this.ActiveProduct['Total Result'] === 0) {
          this.errormessage = true;
        }
      });
    }

  }
  TrashcartElement(Abc: any) {
    // alert(Abc);
    // if (isPlatformBrowser(this.platformId)) {
      // for (let tmp of this.ActiveProduct.Results) {
          alert(Abc)
          // if (tmp.id === Abc) {
            // console.log(tmp);
            this.GetAdd.Deletewatchlist(Abc).subscribe(data => {

              Swal.fire('Your offer has been Deleted.', '', 'success');
              this.httpService.getwatchproducts().subscribe(data => {
                this.ActiveProduct = data.Results;
                if (this.ActiveProduct['Total Result'] === 0) {
                  this.errormessage = true;
                }
              });
            });
            //  this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
            //localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
          // }
      // }
    // }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.', '', 'success');
    }
  }
}
