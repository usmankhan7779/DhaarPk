
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-setting',
  templateUrl: './seller-setting.component.html',
  styleUrls: ['./seller-setting.component.css']
})
export class SellerSettingComponent implements OnInit {
  
  match = true;
  Right = false;
  Error = false;
  notsame = false;
  Waitcall = false;
  USerNameID: any;
  SessionstoreName: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.SessionstoreName = localStorage.getItem('StoreName');
      // this.obj.verify_token().subscribe((response) => {
      // this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];

      console.log('Authorization is:',this.USerNameID);
      //
      //
      //   },
      //   (err) => {
      //     console.log('ERROR:' + err);
      //     this._nav.navigate(['/login']);
      //   },
      //   () => {
      //   }
      // );
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
