import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PostAdComponent} from "./post-ad.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {TextMaskModule} from "angular2-text-mask";
import {HeaderModule} from "../header/header.module";
import {UploadItemService} from '../file-uploads/upload-item-service';
import {NgxUploaderModule} from 'ngx-uploader';
const loginRoutes: Routes = [
  { path: '', component: PostAdComponent }
];


@NgModule({
  declarations: [
    PostAdComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    NgxUploaderModule,
    // TextMaskModule,

    // ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [UploadItemService],
  exports: []
})

export class PostAdModule {

}
