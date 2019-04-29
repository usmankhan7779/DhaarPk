// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// import { HomeService } from './home.services';
import {OwlCarousel} from "ngx-owl-carousel";
import {AdService} from '../post-ad/ad.services';
import {CategoryServices} from "../category-detail/category-detail.services";
import {split} from "ts-node/dist";
import {ActiveAdServices} from "../active-ad/active-ad.services";
// import { HomeService } from '../home/home.services';
import { StoredetailsService } from './storedetails.service';
declare const $: any;

@Component({
  selector: 'app-store-all-details',
  templateUrl: './store-all-details.component.html',
  styleUrls: ['./store-all-details.component.scss']
})
export class StoreAllDetailsComponent implements OnInit {

  GetALLBuyNowProductss: any = [];
  storename: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private GetProducts: StoredetailsService,
              private GetCat:AdService,
              private Category: CategoryServices,
              private GetWatch:ActiveAdServices) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.GetProducts.GetAllStoreByStorenames().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData;
        
        console.log(this.GetALLBuyNowProductss,'get store')
      });
      this.storename=localStorage.getItem("StoreName");
      console.log(this.storename)
    }
  }



}
