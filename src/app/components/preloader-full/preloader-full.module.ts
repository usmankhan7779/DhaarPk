import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
 
import {ImageZoomModule} from 'angular2-image-zoom';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreloaderFull} from './preloader-full';
const loginRoutes: Routes = [
  { path: 'hahah', component: PreloaderFull }
];


@NgModule({
  declarations: [
    PreloaderFull
  ],

  imports: [
    CommonModule,
    FormsModule,
 
    ImageZoomModule,
    // HomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [PreloaderFull]
})

export class PreloaderFullModule {

}
