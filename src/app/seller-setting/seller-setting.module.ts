import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SellerSettingComponent} from "./seller-setting.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
 
import {HeaderModule} from "../header/header.module";
import { MaterialModule } from '../app.module';
const loginRoutes: Routes = [
  { path: '', component: SellerSettingComponent }
];


@NgModule({
  declarations: [
    SellerSettingComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
 
    FormsModule,
 
    
    MaterialModule,
    ReactiveFormsModule,
    // TextMaskModule,

    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SellerSettingModule {

}
