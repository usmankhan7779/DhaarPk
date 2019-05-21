import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CategoryDetailComponent} from "./category-detail.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import { CountdownModule } from "ng2-countdown-timer";
import {HeaderModule} from "../header/header.module";
import {NewModule} from '../home/new.module';
import {PreloaderFullModule} from '../components/preloader-full/preloader-full.module';
 
const loginRoutes: Routes = [
  { path: '', component: CategoryDetailComponent }
];


@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
 
    HeaderModule,
    NewModule,
    PreloaderFullModule,
    // FormsModule,
    // CountdownModule,
    // TextMaskModule,
    CountdownModule,
    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class CategoryDetailModule {

}
