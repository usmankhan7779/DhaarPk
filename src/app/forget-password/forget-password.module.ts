import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ForgetPasswordComponent} from "./forget-password.component";
import {HeaderModule} from "../header/header.module";
// import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// import {TextMaskModule} from "angular2-text-mask";
const loginRoutes: Routes = [
  { path: '', component: ForgetPasswordComponent }
];


@NgModule({
  declarations: [
    ForgetPasswordComponent
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

export class ForgetPasswordModule {

}
