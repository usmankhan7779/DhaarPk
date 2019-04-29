import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Checkout2Component} from "./checkout2.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: Checkout2Component }
];


@NgModule({
  declarations: [
    Checkout2Component
  ],

  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    HeaderModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class Checkout2Module {

}
