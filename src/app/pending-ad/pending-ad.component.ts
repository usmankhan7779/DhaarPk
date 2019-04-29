import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveAdServices } from '../active-ad/active-ad.services';
 
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-ad',
  templateUrl: './pending-ad.component.html',
  styleUrls: ['./pending-ad.component.css']
})
export class PendingAdComponent implements OnInit {
  r: any;
  pageno: any;
  sub: any;
  modelNo: any;
  ActiveProduct: any = [];
  GetPhotos: any = [];
  CatName: any;
  SessionstoreName: any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private _nav: Router,
               private route: ActivatedRoute,
               private httpService: ActiveAdServices) { }

  pageTrendChanged(event) {
    if (isPlatformBrowser(this.platformId)){
    // alert("mobile")
    this.r = event;
    this.pageno = event;

    alert(this.pageno);
    this.httpService.GetAllPendingproductsBYUserID(this.pageno, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });
  }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){

    // console.log('asdada' + localStorage.getItem('UserID'));

    this.httpService.GetAllPendingproductsBYUserID(1, localStorage.getItem('UserID')).subscribe(
      data => {
        this.ActiveProduct = data;
      });


    this.SessionstoreName = localStorage.getItem('StoreName');
  }
  }

  EnableProduct(CatName,Product_ID) {
    this.httpService.EnableProduct(CatName,Product_ID).subscribe()
  }
  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
