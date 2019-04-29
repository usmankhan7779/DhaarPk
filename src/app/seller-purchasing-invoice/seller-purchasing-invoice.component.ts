import {Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import { AdService } from '../post-ad/ad.services';
import { HomeService } from '../home/home.services';
 
// import * as jsPDF from 'jspdf';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-purchasing-invoice',
  templateUrl: './seller-purchasing-invoice.component.html',
  styleUrls: ['./seller-purchasing-invoice.component.css']
})
export class SellerPurchasingInvoiceComponent implements OnInit {

  r: any;

  pageno: any;
  sub: any;
  modelNo: any;
  ShipingInvoice: any = [];
  InvoiceData: any = [];
GetInvoice:any=[];

invoice_detail;
product_detail;
TotalAmount;
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
  GetAllproducts ;
  totalamount;
  qty;

  @ViewChild('content') content:ElementRef;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private CatServices: AdService,
               private GetOneProduct: HomeService,
               private httpService: BuyerDashboardServices) { }



  // public downloadPDF() {
  //   let doc = new jsPDF();
  //   let specialElementHandlers = {
  //     '#editor': function (element,renderer) {
  //       return true;
  //     }
  //   };
  //   let content = this.content.nativeElement;
  //
  //   doc.fromHTML(content.innerHTML, 15,15,{
  //     'width': 190,
  //     'elementHandlers': specialElementHandlers
  //   },function(bla){
  //     doc.save('OrderSlip.pdf');
  //   });
  // }
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

     

       

     

        this.httpService.GetAllProductsBYIncoiceBILL( this.InvoicesID).subscribe(
          dataamount => {
            this.GetAllproducts = dataamount;
            // this.totalamount= this.GetAllproducts.TotalAmount;

            console.log(this.GetAllproducts,'amount')
          });

        // this.httpService.GetShippingByInvoiceId(this.InvoicesID).subscribe(data => 

        // )

      // this.httpService.GetAllProductBYInvoiceId( this.InvoicesID).subscribe(
      //   data => {
      //     this.ProductsID = data;
      //     this.qty=data.qty;
      //     // this.qty = this.ProductsID.Qty;
      //     // alert(this.ProductsID.Qty)
      //     console.log('Products are:::', this.ProductsID);

      //     for (const itm of this.ProductsID) {
      //       this.GetOneProduct.get_AnyProduct_ProductById(itm.ProductID).subscribe(data => {
      //         // this.GetAllproducts.Qty = itm.Qty;
      //         data['Qty']=itm.Qty;

      //         // alert(itm.Qty)
      //         this.GetAllproducts= data.results;
      //         // this.GetAllproducts.push(data);
      //         // alert(this.GetAllproducts)
      //       });
      //     }
      //     console.log('Products details are', this.GetAllproducts);
      //   });

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
