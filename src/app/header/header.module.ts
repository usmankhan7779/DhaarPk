import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HeaderComponent} from "./header.component";
 
const loginRoutes: Routes = [
  { path: 'hahah', component: HeaderComponent }
];


@NgModule({
  declarations: [
    HeaderComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
 
    // HomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],

  providers: [],
  exports: [HeaderComponent]
})

export class HeaderModule {

}
