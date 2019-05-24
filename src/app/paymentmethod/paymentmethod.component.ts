// import { Component, OnInit, NgModule } from '@angular/core';
import { Component, OnInit,NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms'
 
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';
import { Observable } from 'rxjs';
import { AdService } from '../post-ad/ad.services';
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
    { value: 'Visa', viewValue: 'Visa Card' },
    { value: 'Mastercard', viewValue: 'Master Card' },
    { value: 'American Express', viewValue: 'American Express' },
    { value: 'Discover', viewValue: 'Discover' }
  ];
  model: any
  isright;
  constructor(private fb: FormBuilder,
    private PostAdd: AdService) {  }
  signupForm: FormGroup;
  cardholdername;
  ngOnInit() {
    this.signupForm = this.fb.group({

       
      'cardholdername': ['', Validators.compose([Validators.required])],
      'ccv': ['', Validators.compose([Validators.required])],
      'expiry': ['', Validators.compose([Validators.required])],
      'card_type': ['', Validators.compose([Validators.required])],
      'nickname': ['', Validators.compose([Validators.required])],
      'default': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'province': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'cardNumber': ['', Validators.compose([Validators.required])],

      // this.cardholdername = this.signupForm.controls['cardholdername'].value
      // "cardNumber":"4788250000028291",
      // "ccv":"123",
      // "expiry":"1020",
      // "card_type":"VISA",
      // "nickname":"abc"
      // "default":true,
      // "country":"",
      // "province":"",
      // "city":"",
      // "cardholdername":""
    })
  }
  save(){
    console.log(this.signupForm.value)
    this.PostAdd.addpaymentmethod(this.signupForm.value).subscribe(
      data => {
        console.log(data)
      }
    
      
      );
    // console.log(this.model.cardholdername)
  }

}
