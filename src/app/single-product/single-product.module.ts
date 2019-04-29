import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SingleProductComponent } from "./single-product.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageZoomModule } from "angular2-image-zoom";
import { HeaderModule } from "../header/header.module";
import { NewModule } from '../home/new.module';
import { NgxImageZoomModule } from '../Image Zoom/index';
// import { NgxImageZoomModule } from 'ngx-image-zoom';

const loginRoutes: Routes = [
  { path: '', component: SingleProductComponent }
];


@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    ImageZoomModule,
    NewModule,
    NgxImageZoomModule.forRoot(),

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [],
})

export class SingleProductModule {

}
