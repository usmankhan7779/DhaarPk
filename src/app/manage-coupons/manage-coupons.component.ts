import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveAdServices } from '../active-ad/active-ad.services';
 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.css']
})
export class ManageCouponsComponent implements OnInit {
  model: any = {};
  SessionstoreName: any;
  ActiveProduct: any = [];
  r: any;
  pageno: any;
  ProductID:any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: ActiveAdServices,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    //   this.SessionstoreName = localStorage.getItem('StoreName');
    // this.obj.GetAllcoupons(this.SessionstoreName).subscribe(
    //   data => {
    //     this.Coupons = data;
    //
    //   });
      this.SessionstoreName = localStorage.getItem('StoreName');
      if(this.SessionstoreName) {
        this.obj.getBuyNow_ProductBYStoreName(1,localStorage.getItem('StoreName')).subscribe(data => {
          this.ActiveProduct = data;
          console.log('Active Products are:::', this.ActiveProduct);
        });
      } else {
        this._nav.navigate(['/']);
      }
  }
  }
  // pageTrendChanged(event) {
  //   if (isPlatformBrowser(this.platformId)){
  //     this.r = event;
  //     this.pageno = event;

  //     alert(this.pageno);
  //     this.obj.getAll_ProductBYStoreName(this.pageno, localStorage.getItem('StoreName')).subscribe(
  //       data => {
  //         this.ActiveProduct = data;
  //       });
  //   }
  // }

  SaveProduct(product, index) {

    this.ProductID = product;

    console.log('Attributes are:', this.ProductID);
    console.log('Index are:', index);
  }

  verifProduct () {

    this.obj.InsertDisCountcoupons(this.model.cname, this.model['Qty'], this.model['Discount'], this.model['AuctionListing'],   this.SessionstoreName, this.ProductID )
      .subscribe(data => {
        // Swal.fire('Coupon has been added','','sucess')
          Swal.fire({
            title: 'Coupon has been Added',
            html:
            'You have added <b>bold text</b>, ' +
            '<a href="//github.com">links</a> ' +
            'and other HTML tags'
          });
      },
        error => {
        });

  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
