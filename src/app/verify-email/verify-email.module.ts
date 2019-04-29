import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {VerfiyEmailComponent} from "./verify-email.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";

import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: VerfiyEmailComponent }
];


@NgModule({
  declarations: [
    VerfiyEmailComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,

    FormsModule,
    TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class VerfiyEmailModule {

}
