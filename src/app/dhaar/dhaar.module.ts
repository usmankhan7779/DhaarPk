import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
 
import {DhaarComponent} from './dhaar.component';
const loginRoutes: Routes = [
  { path: '', component: DhaarComponent }
];


@NgModule({
  declarations: [
    DhaarComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
 
    FormsModule,
    // TextMaskModule,

    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class DhaarModule {

}
