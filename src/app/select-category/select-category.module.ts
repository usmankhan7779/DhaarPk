import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SelectCategoryComponent} from "./select-category.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HeaderModule} from "../header/header.module";
const loginRoutes: Routes = [
  { path: '', component: SelectCategoryComponent }
];


@NgModule({
  declarations: [
    SelectCategoryComponent
  ],

  imports: [
    CommonModule,
    HeaderModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class SelectCategoryModule {

}
