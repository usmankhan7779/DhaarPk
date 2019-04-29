import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CheckoutComponent} from "./checkout.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
const loginRoutes: Routes = [
  { path: '', component: CheckoutComponent }
];


@NgModule({
  declarations: [
    CheckoutComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class CheckoutModule {

}
