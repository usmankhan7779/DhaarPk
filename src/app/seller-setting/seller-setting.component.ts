
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
     

 
      this.obj.changepass(old, new1, new2).subscribe((data) => {
          /* this function is executed every time there's a new output */
          console.log("VALUE RECEIVED: "+data['msg']);
        //   // if(response.json() == "PasswordChanged"){  
        //     return Response({'msg':'PasswordChanged'},status=status.HTTP_200_OK)
        // else:
        //     return Response({'msg':'something went wrong'},status=status.HTTP_400_BAD_REQUEST)  
        if ( data.msg == "PasswordChanged") { 
          Swal.fire({
            title: 'You have been successfully update your passwrod',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
                // Swal.fire('You have been successfully update your passwrod.','','success');
        }
        else if (data.msg == "something went wrong"){
          Swal.fire({
            title: 'Something Went Wrong',
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          // Swal.fire('You have been successfully update your passwrod.','','success');

        }
          // }
          // else {
          // }
        }
        );        
      



     

  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
