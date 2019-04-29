import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import {AboutUssComponent} from './about-uss.component';
const loginRoutes: Routes = [
  { path: '', component: AboutUssComponent }
];


@NgModule({
  declarations: [
    AboutUssComponent
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

export class AboutUssModule {

}
