import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { AdService } from '../post-ad/ad.services';
import { HomeService } from '../home/home.services';


import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-buyer-invoice',
  templateUrl: './buyer-invoice.component.html',
  styleUrls: ['./buyer-invoice.component.css']
})
export class BuyerInvoiceComponent implements OnInit {

  r: any;

  pageno: any;
  sub: any;
  modelNo: any;
  ShipingInvoice: any = [];
  InvoiceData: any = [];

  ProductsID: any = [];
  AllCategories: any = [];
  resultProduct: any = [];
  GetPhotos: any = [];
  InvoicesID: any;
  Str: string;
  TMpStr: string;
  TableName: string;
  SessionstoreName: string;
  Allproducts: any = {'products': []};
  GetAllproducts = [];



  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private CatServices: AdService,
               private GetOneProduct: HomeService,
               private httpService: BuyerDashboardServices) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.SessionstoreName = localStorage.getItem('StoreName');
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.InvoicesID = params['InvoicesID'] || '0' ;
        });

      if (localStorage.getItem('UserID') === null) {

        this._nav.navigate(['/login']);
      } else {

        //Gets all Shi[pping detail of user
        this.httpService.GetShippingByInvoiceId( this.InvoicesID).subscribe(
          data => {
            this.ShipingInvoice = data;
          });

        this.CatServices.GetAllCategories().subscribe(
          data => {
            this.AllCategories = data;
          });

        //Gets all invoice details e.g. payment, guest, balance, userID
        this.httpService.GetInvoiceByInvoiceID( this.InvoicesID).subscribe(
          data => {
            this.InvoiceData = data;
          });

        this.httpService.GetAllProductBYInvoiceId( this.InvoicesID).subscribe(
          data => {
            this.ProductsID = data;
            console.log('Products are:::', this.ProductsID);

            for (const itm of this.ProductsID) {
              this.GetOneProduct.get_AnyProduct_ProductById(itm.ProductID).subscribe(data => {
                // this.GetAllproducts.Qty = itm.Qty;
                data['Qty']=itm.Qty;
                this.GetAllproducts.push(data);
              });
            }
            console.log('Products details are', this.GetAllproducts);
          });

      }
    }
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
