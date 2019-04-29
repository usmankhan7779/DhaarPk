import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
 
import {HeaderModule} from "../header/header.module";
import {SellerProductSettingComponent} from './seller-product-setting.component';
const loginRoutes: Routes = [
  { path: '', component: SellerProductSettingComponent }
];


@NgModule({
  declarations: [
    SellerProductSettingComponent
  ],

  imports: [
    CommonModule,
 
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SellerProductSettingModule {

}
