import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BuyerDashboardComponent} from "./buyer-dashboard.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import {UploadItemService} from '../file-uploads/upload-item-service';
const loginRoutes: Routes = [
  { path: '', component: BuyerDashboardComponent }
];


@NgModule({
  declarations: [
    BuyerDashboardComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
 
    // FormsModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [UploadItemService],
  exports: []
})

export class BuyerDashboardModule {

}
