import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ChangePasswordComponent} from "./change-password.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: ChangePasswordComponent }
];


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class ChangePasswordModule {

}
