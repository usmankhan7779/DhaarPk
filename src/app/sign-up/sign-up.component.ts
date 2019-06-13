
import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { isPlatformBrowser } from '@angular/common';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { RecapchaService } from '../recapcha/recapcha.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  model: any = {"Agree": false};
  loading = false;
  Waitcall = false;
  returnUrl: string;
  registration_ok = false;
  UserError = false;
  EmailPosterror = false;
  recaptcha: any;
  signupForm: FormGroup;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  Emailchange= false;
  termsAggre= false;
  PassMatch= true;
  registration_error = false;
  // captcha = false;
  Country ='';
  State='';
  City='';
  zip='';
  Address='';
  Pic='';
  hide = true;
  hide1  = true;
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  useronly='[a-zA-Z0-9_.]+';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
   passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private singup: LoginService,
               private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder,
               private recha: RecapchaService,

  ) { }

  ngOnInit() {
    $(".mat-input").focus(function(){
      $(this).parent().addClass("is-active is-completed");
    });
    
    $(".mat-input").focusout(function(){
      if($(this).val() === "")
        $(this).parent().removeClass("is-completed");
      $(this).parent().removeClass("is-active");
    })
    if (isPlatformBrowser(this.platformId)) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/log-in';

   
    this.signupForm = this.fb.group({
    
      'FName': ['', Validators.compose([Validators.required])],
      'LName' : ['', Validators.compose([Validators.required])],
      'Email': ['', Validators.compose([Validators.required, Validators.pattern(this.email)])],
       'Username': ['', Validators.compose([Validators.required, Validators.pattern(this.useronly)])],
       'Mobile': ['', Validators.compose([Validators.required])],
      
      'password': ['', Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
      'RePassword': ['', Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
    }
    ,
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
      );
  }
}
   
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response ${captchaResponse}:`);
  //   this.captcha= true;
  // }
  register() {
    if (this.recha.check()) {
    if (isPlatformBrowser(this.platformId)) {
      
      console.log('agree value is:',this.model.Agree);
 
    // if (this.model.Agree) {


      // if (this.recaptcha) {
      //   this.Waitcall = true;

        if (this.Emailok) {
          // post_signup_form(username: string, email: string, password: string, Fname, LName, Mobile,Country,State,City,zip,Address,Pic) {
// this.register.value['firstname'] 
          // this.singup.post_signup_form(this.model.Username, this.model.Email, this.model.Password, this.model.FName, this.model.LName,
          //  this.model.Mobile,this.Country,this.State,this.City,this.zip,this.Address,this.Pic).subscribe((response) => {
            this.singup.post_signup_form(this.signupForm.value['Username'],this.signupForm.value['Email'],this.signupForm.value['password'],
            this.signupForm.value['FName'],this.signupForm.value['LName'],this.signupForm.value['Mobile'],
            this.Country,this.State,this.City,this.zip,this.Address,this.Pic).subscribe((response) => {

          
              Swal.fire(
                'Registered!',
                'You have successfully Registered',
                'success'
              );
              this.registration_ok = true;
            },
            (err) => {
              // Swal.fire('Oops...', 'Something went wrong!', 'error');
              this.Waitcall = false;
              this.registration_error = true;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
            () => {
              /* this function is executed when the observable ends (completes) its stream */
              //   console.log("COMPLETED");
            }
          );
        } else {
          // Swal.fire('Email already Exist', '','error');
          this.Waitcall = false;
          this.EmailPosterror = true;
        }
      // } else {
      //   alert('Captcha Missing');
      //
      // }
    // } else {
    //   console.log('agree is ', this.model.Agree);
    //   // Swal.fire('You must agree to the terms  first.','','error');
    // }


    // this.router.navigate([this.returnUrl]);
    // alert('???');

  }
}
else{
  this.recha.resetImg();
    Swal.fire({
      type: 'error',
      title: 'Recaptcha Confirmation',
      text: 'Please confirm you are not a robot',
      showConfirmButton: false,
      width: '512px',
      timer: 2000
    });
}
  }

  onChange(username: string) {
    if (isPlatformBrowser(this.platformId)) {


      if (username !== '') {


        if (username.length > 4 && username.length < 30) {
          if (username.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
            this.Userloading = true;
            this.UserTyping = true;


            this.singup.verify_username(username).subscribe((response) => {
                /* this function is executed every time there's a new output */
                // console.log("VALUE RECEIVED: "+response);
                if (response.Res !== true) {

                  this.Userloading = false;
                  this.UserError = true;
                  //   alert('true');

                } else {
                  this.Userloading = false;
                  this.UserError = false;
                  //   alert(response_useradmin.Res);
                }
              },
              (err) => {

                console.log('error');
                this.Userloading = true;

                alert(err);
                ////const User_exist_Resonse= err.json();


                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
              () => {
                console.log('error');
                /* this function is executed when the observable ends (completes) its stream */
                //   console.log("COMPLETED");
              }
            );
          }
        } else {
          this.UserTyping = true;
          this.Userloading = false;
          this.UserError = false;

        }
      } else {
        this.UserTyping = false;

      }
    }
  }

  checkEmail(email: string) {

    if (isPlatformBrowser(this.platformId)) {

      console.log('Email.... : ' + email);
      if (email !== '') {

        if (email.length > 4) {


          this.singup.check_email_unique(email).subscribe((data) => {
              console.log('Email Checked Subscribe');
              if (data['exists'] === 'Yes') {
                this.Emailinvalid = false;
                this.EmailExist = true;
                // this.out_put = true;
              } else {
                this.Emailinvalid = false;
                // console.log("false");
                this.Emailok = true;

                // this.out_put = false;
              }

            },
            (err) => {
              this.Emailinvalid = true;
            },
            () => {
              /* this function is executed when the observable ends (completes) its stream */
              //   console.log("COMPLETED");
            }
          );
        } else {
          this.Emailok = false;
          this.Emailinvalid = true;
        }
      } else {
        this.Emailinvalid = false;


      }
    }
  }
  // resolved(captchaResponse: string) {
  //
  //   if (captchaResponse) {
  //     this.recaptcha = true;
  //   }
  // }
  // alert("hiii")  }
  OnEmailChangeEvent() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Change Event');
      this.EmailExist = false;
      this.Emailok = false;
    }
  }

  checkPassowed(RePass: string, Pass: string) {
    if (isPlatformBrowser(this.platformId)) {

      if (RePass !== Pass) {
        this.PassMatch = false;

      } else {
        //  not match
        this.PassMatch = true;

      }
    }
  }

  OnPassReset() {
    if (isPlatformBrowser(this.platformId)) {
      this.PassMatch = true;
    }
  }
}
