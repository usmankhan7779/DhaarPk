import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerfiyEmailComponent implements OnInit {
  sub;
  blogs;
  query;
  password1;
  password2;
  searchQuery;
  Waitcall = false;
  key: any;
  email: any;
  is_set = false;
  is_send = false;
  is_match_error = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private route: ActivatedRoute,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
    window.scrollTo(0, 0);
      this.sub = this.route.params.subscribe(params => {
        this.key = params['key'] || '0';
      });
      if ( this.key === '0')  {
        this._nav.navigate(['/login']);
      }

      this.obj.UserConfirm(this.key).subscribe( data => {
        Swal.fire({
          title: 'Welcome Back. Thanks for verifying your account.',
          type: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this._nav.navigate(['/login'])
          }
        })
      });

      console.log('KEY is:', this.key);
    }

  }

  resedcode( ) {
    if (isPlatformBrowser(this.platformId)) {
      this.Waitcall = true;
      this.obj.sendmail(localStorage.getItem('email'))
        .subscribe(
          data => {
            // this.alertService.success('Registration successful', true);
            this.is_send = true;
            this.is_match_error = false;
            this.Waitcall = false;
            // alert('success')
          },
          error => {
            this.is_send = false;
            this.is_match_error = true;
            this.Waitcall = false;

          });
    }
  }

  UPdatePassword( pass2: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.is_set = false;
      this.Waitcall = true;
      this.obj.checkcode(pass2, localStorage.getItem('email'))
        .subscribe(
          data => {
            // alert('done');
            this.obj.loged_in(localStorage.getItem('Usernamae'), localStorage.getItem('password'), null, null, null).subscribe((response) => {
                /* this function is executed every time there's a new output */
                // console.log("VALUE RECEIVED: "+response);

                // alert('logedin');
              },
              (err) => {
                this.Waitcall = false;
                alert('error ');
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
              () => {
                /* this function is executed when the observable ends (completes) its stream */
                //   console.log("COMPLETED");
              }
            );
            this.Waitcall = false;
            // this.alertService.success('Registration successful', true);
            // this._nav.navigate(['/login']);
            // alert('success')
          },
          error => {
            this.Waitcall = false;
            this.is_set = true;
            // this.alertService.error(error);
            // this.loading = false;
            // alert(error);
          });
    }
  }

}
