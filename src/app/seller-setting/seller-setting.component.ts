
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasswordValidation } from './password-validator.component';

@Component({
  selector: 'app-seller-setting',
  templateUrl: './seller-setting.component.html',
  styleUrls: ['./seller-setting.component.css']
})
export class SellerSettingComponent implements OnInit {
  hide = true;
  hide1 =true;
  hide2=true;
  match = true;
  Right = false;
  Error = false;
  notsame = false;
  Waitcall = false;
  USerNameID: any;
  SessionstoreName: any;
  signupForm: FormGroup;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,private fb: FormBuilder,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.signupForm = this.fb.group({
        'old': ['', Validators.compose([Validators.required])],
        'new1': ['', Validators.compose([Validators.required])],
        'new2': ['', Validators.compose([Validators.required])],
  
      },{
        validator: PasswordValidation.MatchPassword // your validation method
      });

      
  
    }
  }


  updatePassword(old: string, new1: string, new2: string) {
    this.Error = false;
    this.Right = false;

    if (old === new1 || old === new2) {
        this.notsame = true;
    } else {
    if (new1 === new2) {
      this.match = true;
      this.Waitcall = true;
      this.obj.changepass(this.USerNameID, old, new1, new2).subscribe((response) => {
          /* this function is executed every time there's a new output */
          // console.log("VALUE RECEIVED: "+response);
          this.Error = false;
          this.Waitcall = false;
          this.Right = true;


        },
        (err) => {
          this.Right = false;
          this.Waitcall = false;
          this.Error = true;
          /* this function is executed when there's an ERROR */
          //   console.log("ERROR: "+err);
        },
        () => {

          /* this function is executed when the observable ends (completes) its stream */
          //   console.log("COMPLETED");
        }
      );



    } else {

      this.match = false;
    }
    }

  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
