// import { Component, OnInit, NgModule } from '@angular/core';
import { Component, OnInit,NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms'
 
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';
import { Observable } from 'rxjs';
declare const $: any;
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private fb: FormBuilder) {  }
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = this.fb.group({

      'FName': ['']
       
    })
  }

}
