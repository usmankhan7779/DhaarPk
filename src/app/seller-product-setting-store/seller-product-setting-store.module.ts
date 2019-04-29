import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
 
import {HeaderModule} from "../header/header.module";
// import {SellerProductSettingComponent} from './seller-product-setting.component';
import { SellerProductSettingStoreComponent } from './seller-product-setting-store.component';
import { StoredetailsService } from '../store-all-details/storedetails.service';
const loginRoutes: Routes = [
  { path: '', component: SellerProductSettingStoreComponent }
];


@NgModule({
  declarations: [
    SellerProductSettingStoreComponent
  ],

  imports: [
    CommonModule,
     
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [StoredetailsService],
  exports: []
})

export class SellerProductSettingStoreModule {

}
