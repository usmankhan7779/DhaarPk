import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CategoryDetailComponent} from '../category-detail/category-detail.component';
import {SingleProductComponent} from '../single-product/single-product.component';
 
import {ImageZoomModule} from 'angular2-image-zoom';
import {HeaderComponent} from '../header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderModule} from '../header/header.module';
import {PreloaderFullModule} from '../components/preloader-full/preloader-full.module';
import {ImageViewerModule, ImageViewerConfig, CustomEvent} from 'ngx-image-viewer';
const loginRoutes: Routes = [
  { path: 'hahah', component: HeaderComponent }
];

const config = {
  btnClass: 'default', // The CSS class(es) that will apply to the buttons
  zoomFactor: 0.1, // The amount that the scale will be increased by
  containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
  wheelZoom: true, // If true, the mouse wheel can be used to zoom in
  allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
  allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
  btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
    zoomIn: 'fa fa-plus',
    zoomOut: 'fa fa-minus',
    rotateClockwise: 'fa fa-repeat',
    rotateCounterClockwise: 'fa fa-undo',
    next: 'fa fa-arrow-right',
    prev: 'fa fa-arrow-left',
    fullscreen: 'fa fa-arrows-alt',
  },
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true
  }
};

@NgModule({
  declarations: [
    CategoryDetailComponent,
    SingleProductComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
   
    ImageZoomModule,
    HeaderModule,
    PreloaderFullModule,
    ImageViewerModule.forRoot(config),
    // HomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [CategoryDetailComponent,
  SingleProductComponent]
})

export class NewModule {

}
