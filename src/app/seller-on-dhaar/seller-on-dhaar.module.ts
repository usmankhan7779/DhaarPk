import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
 
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
 
import {HeaderModule} from "../header/header.module";
import { SellerOnDhaarComponent } from './seller-on-dhaar.component';
const loginRoutes: Routes = [
  { path: '', component: SellerOnDhaarComponent }
];


@NgModule({
  declarations: [
    SellerOnDhaarComponent
  ],

  imports: [
    CommonModule,
  
    FormsModule,
    HeaderModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class sellerondhaarModule {

}
