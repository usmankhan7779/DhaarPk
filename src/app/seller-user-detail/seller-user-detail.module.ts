import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SellerUserDetailComponent} from "./seller-user-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import { MaterialModule } from '../app.module';
const loginRoutes: Routes = [
  { path: '', component: SellerUserDetailComponent }
];


@NgModule({
  declarations: [
    SellerUserDetailComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    TextMaskModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule
  ],

  providers: [],
  exports: []
})

export class SellerUserDetailModule {

}
