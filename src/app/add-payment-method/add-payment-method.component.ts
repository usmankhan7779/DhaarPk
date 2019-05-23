import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  constructor(private fb: FormBuilder) {  }
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = this.fb.group({

      'FName': ['']
       
    })
  }
}
