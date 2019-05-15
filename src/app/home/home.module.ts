import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import { OwlModule} from "ngx-owl-carousel";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HeaderModule} from "../header/header.module";
import {CategoryDetailComponent} from '../category-detail/category-detail.component';
import {SingleProductComponent} from '../single-product/single-product.component';
import { CountdownModule } from "ng2-countdown-timer";
import {ImageZoomModule} from 'angular2-image-zoom';
import {NewModule} from './new.module';
import {PreloaderFullModule} from '../components/preloader-full/preloader-full.module';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SlickModule } from 'ngx-slick';
const loginRoutes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
    CommonModule,
    OwlModule,
    HeaderModule,
    NewModule,
    SlickModule,
    PreloaderFullModule,
 CountdownModule,
    ImageZoomModule,
    FormsModule,
    ReactiveFormsModule,
    // InfiniteScrollModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: []
})

export class HomeModule {

}
