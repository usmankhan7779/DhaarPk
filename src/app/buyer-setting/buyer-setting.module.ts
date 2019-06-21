import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BuyerSettingComponent} from "./buyer-setting.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import { MaterialModule } from '../app.module';
import {HeaderModule} from "../header/header.module";
// import {MatInputModule} from '@angular/material/input'
const loginRoutes: Routes = [
  { path: '', component: BuyerSettingComponent }
];


@NgModule({
  declarations: [
    BuyerSettingComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    MaterialModule,
 
    FormsModule,
    TextMaskModule,
    FormsModule, ReactiveFormsModule,
    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class BuyerSettingModule {

}
