import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
 
import {HeaderModule} from "../header/header.module";
import { AddPaymentMethodComponent } from './add-payment-method.component';
import { MaterialModule } from '../app.module';
const loginRoutes: Routes = [
  { path: '', component: AddPaymentMethodComponent }
];


@NgModule({
  declarations: [
    AddPaymentMethodComponent
  ],

  imports: [
    CommonModule,
 
    HeaderModule,
    FormsModule,
    TextMaskModule,
    MaterialModule,
    ReactiveFormsModule,
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class AddPaymentMethod {

}
