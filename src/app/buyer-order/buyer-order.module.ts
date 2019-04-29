import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BuyerOrderComponent} from "./buyer-order.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
 
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: BuyerOrderComponent }
];


@NgModule({
  declarations: [
    BuyerOrderComponent
  ],

  imports: [
    CommonModule,
 
    HeaderModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class BuyerOrderModule {

}
