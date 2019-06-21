import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ContactUsComponent} from "./contact-us.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {MatInputModule} from '@angular/material/input';
import {HeaderModule} from "../header/header.module";
import {RecaptchaModule} from "ng-recaptcha";
const loginRoutes: Routes = [
  { path: '', component: ContactUsComponent }
];


@NgModule({
  declarations: [
    ContactUsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    RecaptchaModule.forRoot(),
    TextMaskModule,
    // TextMaskModule,
    MatInputModule,
    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class ContactUsModule {

}
