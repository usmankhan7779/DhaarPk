import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
 
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import { MaterialModule } from '../app.module';
 
import {HeaderModule} from "../header/header.module";
import { PaymentmethodComponent } from './paymentmethod.component';
const loginRoutes: Routes = [
  { path: '', component: PaymentmethodComponent }
];


@NgModule({
  declarations: [
    PaymentmethodComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
     
   
    
    
    // TextMaskModule,
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

export class paymentModule {

}
