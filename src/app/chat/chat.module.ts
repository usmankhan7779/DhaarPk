import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ChatComponent} from "./chat.component";

// import {CheckoutComponent} from "./checkout.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
const loginRoutes: Routes = [
    { path: '', component: ChatComponent }
  ];
  @NgModule({
    declarations: [
      ChatComponent
    ],
  
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(loginRoutes)
    ],
  
    providers: [],
    exports: []
  })
  
  export class ChatModule {
  
  }
  