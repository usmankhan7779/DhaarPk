import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './log-in.services';
import {FormControl, NgModel, Validators, FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {HttpService} from '../services/http-service';
import {Headers, Response} from '@angular/http';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';
import { GoogleLoginProvider,AuthService,SocialUser, FacebookLoginProvider } from 'angular4-social-login';
import Swal from 'sweetalert2';
import { JwtHelper } from 'angular2-jwt';
declare const $: any;

       
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  user: SocialUser;
  model: any = {};
  private sub: any;
  loading = false;
  SignUpDOne = false;
  StoreUpDOne = false;
  login_error = false;
  Waitcall = false;
  logout: string;
  fb_id: any;
  jwtHelper: JwtHelper = new JwtHelper();
  fb_name: any;
  fb_email: any;
  fb_photo_Url: any;
  fb_token: any;
  ProID: string;
  RedirectFromlogin: string;
  CatName: string;

  checkout: string;
  returnUrl: string;
  // captcha = false;

  // CaptchaForm = new FormControl(
  // Validators.required,
  // );


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private http: HttpService,
              private recha: RecapchaService,
              private authService: AuthService,
              private obj: LoginService,
              private _nav: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    $(".mat-input").focus(function () {
      $(this).parent().addClass("is-active is-completed");
    });

    $(".mat-input").focusout(function () {
      if ($(this).val() === "")
        $(this).parent().removeClass("is-completed");
      $(this).parent().removeClass("is-active");
    })
    if (isPlatformBrowser(this.platformId)) {

      //   if(localStorage.getItem('UserID'))
      //   {
      //     this._nav.navigate(['/']);
      //
      // } else {
      // this.authService.authState.subscribe((user) => {
      //   this.user = user;
      //   console.log('Name of user', this.user);
      // });
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.logout = params['Logout'] || 0;
          this.CatName = params['CatName'] || null;
          this.ProID = params['ProID'] || null;
          this.checkout = params['checkout'] || null;

        });


      if (localStorage.getItem('Reg') === 'Done') {

        this.SignUpDOne = true;
        localStorage.setItem('Reg', null);
      }
      if (localStorage.getItem('StoreReg') === 'Done') {

        this.StoreUpDOne = true;
        localStorage.setItem('StoreReg', null);
      }
      window.scrollTo(0, 0);

      if (this.logout === 'yes') {
        this.LogOutClick();

      }
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }
  }


  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log('HAhahahahaahahahah')
  }


  // socialCallBack = (user) => {
  //   this.user = user;
  //   console.log(this.user);
  //   const headers = { 'Content-Type': 'application/json' };
  //   return  this.http.post('https://apis.dhaar.pk/user/sociallogin/', {
  //     id: this.fb_id,
  //     name: this.fb_name,
  //     email: this.fb_email,
  //     photoUrl: this.fb_photo_Url,
  //     authToken: this.fb_token
  //   }).map((res: Response) => res.json()).subscribe(data => {
  //         // let user = {
  //         //   user_id: this.jwtHelper.decodeToken(data['token']).user_id,
  //         //   username: this.jwtHelper.decodeToken(data['token']).username,
  //         //   token: data['token'] };
  //         // if (user && user.token) {
  //         //   localStorage.setItem('loged_in', '1');
  //         //   localStorage.setItem('currentUser', JSON.stringify(user));
  //         //   localStorage.setItem('profilePhoto' , this.pic);
  //           this._nav.navigate(['/dashboard']);
  //         //   this.showSuccess();
  //         // }
  //     console.log(data);
  //       }
  //     );
  // }

  signOut(): void {
    this.authService.signOut();
  }
  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response ${captchaResponse}:`);
  //   this.captcha= true;
  // }
  // isFieldValid(form: FormGroup, field: string) {
  //   return !form.get(field).valid && form.get(field).touched;
  // }
  // displayFieldCss(form: FormGroup, field: string) {
  //   return {
  //     'has-error': this.isFieldValid(form, field),
  //     'has-feedback': this.isFieldValid(form, field)
  //   };
  // }
  loged_in(username: any, password: any) {
    if (this.recha.check()) {
    this.obj.loged_in(username, password, this.CatName, this.ProID, this.checkout).subscribe((response) => {
        /* this function is executed every time there's a new output */
        // console.log("VALUE RECEIVED: "+response);
        
        Swal.fire(
          'Logged In!',
          'Successfully login to your account',
          'success'
        );
        this.login_error = false;
        this.Waitcall = true;

      },
      (err) => {
        Swal.fire(
          'Invalid Credentials',
          'You have entered invalid login credentials',
          'error'
        );
        // this.Waitcall = false;
        this.login_error = true;
        /* this function is executed when there's an ERROR */
        //   console.log("ERROR: "+err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        //   console.log("COMPLETED");
      }
    );
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



  LogOutClick() {
    if (isPlatformBrowser(this.platformId)){
   // console.log('Before');
    console.log(localStorage.getItem('Authorization'));
  //  this.obj.loged_out();
    localStorage.setItem('Authorization', '0');


    console.log(localStorage.getItem('Authorization'));
    this._nav.navigate(['/login']);
  }
  }

//   signInWithGoogleBtn(): void {
//     this.signInWithGoogle();
//     this.authService.authState.subscribe((response: any) => {
//       console.log(response);
//       console.log(response.authToken);
//       localStorage.setItem('profilepic', response.photoUrl)
//       console.log(response.id);
//       const headers = new Headers({'Authorization': 'Bearer google-oauth2 ' + response.authToken});
//       headers.append('Content-Type', 'application/json');
//       this.http.post('http://127.0.0.1:8000/user/fblogin/',
//         {uid: response.id}, {headers: headers}
//       ).subscribe(objgoogle => {
//           console.log(objgoogle.json());
//           console.log(objgoogle.json().token);
//           console.log(objgoogle.json().first_name);
//           localStorage.setItem('Authorization', objgoogle.json().token);
//           localStorage.setItem('username', objgoogle.json().first_name);
//           localStorage.setItem('loggedin', 'google');
//           localStorage.setItem('userid', objgoogle.json().id);
//           },
//         error => {
// //  this.showError();
//         });
//     });
//   }

signInWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
  //   (userData) => {
  //   this.user = userData;
  //   console.log('User Data...', this.user);
  // });
    .then(this.socialCallBack).catch(user => console.log(user));
}

///////////////////////////////////////////////////////////////////////
socialCallBack = (user) => {
  this.user = user;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (user) {
      const createUser = this.http.post('https://apis.dhaar.pk/user/sociallogin/', {
          user
      }, { headers: headers })
      createUser.subscribe(data => {
          let user = { userid: this.jwtHelper.decodeToken(data.json().token).user_id,
               username: this.jwtHelper.decodeToken(data.json().token).username,
                token: data.json().token };
          if (user && user.token) {
              localStorage.setItem('loged_in', '1');
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          Swal.fire({
              type: 'success',
              title: 'Successfully Logged in',
              showConfirmButton: false,
              timer: 1500, width: '512px',
          });
          // this._location.back();
          // if (localStorage.getItem('member')) {
          //     let url = localStorage.getItem('member')
          //     let last = url.length
          //     let ur = url.slice(0, 13)
          //     let state = url.slice(0, 5)
          //     let category = url.slice(0, 8)
          //     let agency = url.slice(0, 6)


          //     if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
          //     else if (state == 'state') {
          //         this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
          //     }
          //     else if (category == 'category') {
          //         this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
          //     }
          //     else if (agency == 'agency') {

          //         this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
          //     }
          //     else if (url == 'advanced-search') {
          //         this._nav.navigate([url]);
          //     }
          //     else if (url == 'latest-rfp') {
          //         this._nav.navigate([url]);
          //     }
          //     else {
          //         var val = 'rfp/' + url
          //         this._nav.navigate([val]);
          //     }
          // } else {
          //     this._nav.navigate(['/']);
          // }

      },
          error => {
            Swal.fire(
                  'Invalid',
                  'Something went wrong',
                  'error'
              )
          })
  }
}

}