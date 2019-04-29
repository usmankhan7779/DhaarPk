import { NgModule}      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./file-uploads.routing";
import {FileUploadsComponent} from "./file-uploads.component";
import {UploadItemService} from "./upload-item-service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from '../header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HeaderModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    FileUploadsComponent
  ],
  providers: [
    UploadItemService
  ]
})
export class FileUploadsModule {

}
