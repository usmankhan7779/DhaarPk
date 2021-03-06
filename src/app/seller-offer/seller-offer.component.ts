import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import Swal from "sweetalert2";



@Component({
  selector: 'app-seller-offer',
  templateUrl: './seller-offer.component.html',
  styleUrls: ['./seller-offer.component.scss']
})
export class SellerOfferComponent implements OnInit {
  sub;
  model: any = {};
  ProductOffer: any = [];
  ActiveProduct: any = [];
  errormessage = false;
  SessionstoreName: any;
  seller = false;
  r: any;
  pageno: any;
  user: any;
  Product: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private _nav: Router,
              private httpService: ActiveAdServices,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      if (localStorage.getItem('UserID') === null) {

        this._nav.navigate(['/login']);
      }
      this.SessionstoreName = localStorage.getItem('StoreName');

      this.httpService.OfferProducts(localStorage.getItem('UserID')).subscribe(data => {
        this.ProductOffer = data;
        console.log('yahooooo', this.ProductOffer);
        if (this.ProductOffer === 0) {
          this.errormessage = true;
        }
      });

    }

  }
  AcceptOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.acceptOffer(this.user,this.Product).subscribe( data => {
      Swal.fire('This Offer has been Accepted', '', 'success')
    });
  }
  RejectOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
    this.httpService.rejectOffer(this.user,this.Product).subscribe( data => {
      Swal.fire('This Offer has been Rejected', '', 'success')
    });
  }

  DeleteOffer(user: any, pro: any) {
    this.user = user;
    this. Product = pro;
    this.httpService.DeleteOffer(this.user, this.Product).subscribe(data => {
      Swal.fire('Your offer has been Deleted.','','success');
    });
  }

  CounterOffer(user: any, pro: any) {
    this.user = user;
    this.Product = pro;
    console.log('Hahahahahaha',this.user,this.Product);
  }

  UpdateOffer() {
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

      this.httpService.ProductOffers(this.user,this.Product,this.model).subscribe((response) => {
          /* this function is executed every time there's a new output */
          // console.log("VALUE RECEIVED: "+response);
          // alert('inserted');
          Swal.fire('Your offer has been Updated. Please wait for the seller to respond.','','success');
        },
        (err) => {
          //erro
        },
        () => {
          /* this function is executed when the observable ends (completes) its stream */
          //   console.log("COMPLETED");
        }
      );
    } else {
      Swal.fire('Please Enter both Fields, Quantiy and Price per Quantity','','error');

    }
  }

  UpdateCounterOffer() {
    if ( this.model.OfferAmount && this.model.QuantityProduct ) {

      this.httpService.BuyerCounterOffers(this.user,this.Product,this.model).subscribe((response) => {
          /* this function is executed every time there's a new output */
          // console.log("VALUE RECEIVED: "+response);
          // alert('inserted');
          Swal.fire('Your offer has been Updated. Please wait for the seller to respond.','','success');
        },
        (err) => {
          //erro
        },
        () => {
          /* this function is executed when the observable ends (completes) its stream */
          //   console.log("COMPLETED");
        }
      );
    } else {
      Swal.fire('Please Enter both Fields, Quantiy and Price per Quantity','','error');

    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
