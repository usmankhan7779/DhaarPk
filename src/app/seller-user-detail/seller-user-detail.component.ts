import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms'
 
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';
import { Observable } from 'rxjs';
declare const $: any;
@Component({
  selector: 'app-seller-user-detail',
  templateUrl: './seller-user-detail.component.html',
  styleUrls: ['./seller-user-detail.component.css']
})
export class SellerUserDetailComponent implements OnInit {
  model: any = {};
  signupForm: FormGroup;
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1button = false;
  step2button = false;
  Waitcall = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  base64textString;
  SessionstoreName: any;
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  GetUSerdetails: any [];
  Addbestoffer = false;
  Auction = true;
  file: any;
  USerNameID: any;
  files: FileList;
  Error= false;
  Right= false;
  match = true;
  notsame = false;
  url: any = 'JPG, GIF, PNG';
  // filetoup1:any=[];
  // PicCounter: any =0;
  PictureCheck = false;
filetoup: FileList;
  fileName = '';
  Vendor:  any;
  ISConfirmed:any;
  id:any;
  Username:any;
  complete:any;
  picname:any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private fb: FormBuilder,
              private _nav: Router,
              private Profile: LoginService,
              private itemUploadService: UploadItemService) { }

  ngOnInit() {
 
    this.signupForm = this.fb.group({

      'FName': [''],
      'Lname': [''],
      'City': [''],
      'Zip': [''],
      'personal': [''],
      'address': [''],
      'Country': [''],
      'State': [''],
    })
    if (isPlatformBrowser(this.platformId)) {
      this.SessionstoreName = localStorage.getItem('StoreName');
    //  this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    // GetUSerdetailsByUserId
    // GetUserDetailByName
      this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
        this.GetUSerdetails = resSlidersData;
        // console.log('fdsf');
        this.id= this.GetUSerdetails['id']
        this.Vendor= this.GetUSerdetails['Vendor']
        this.complete = this.GetUSerdetails['Complete']
        this.ISConfirmed = this.GetUSerdetails['ISConfirmed']
        this.picname= this.GetUSerdetails['Pic']
        this.USerNameID= this.GetUSerdetails['user_id']
        console.log(this.GetUSerdetails,'getuser');
      });
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
  }
  checkEmail(email: string) {

    if (email !== '') {

      if (email.length > 4) {



        this.obj.email_verifyforStore(email).subscribe(( data ) => {

            if (data['exists'] === 'Yes') {
              this.Emailinvalid = false;
              this.EmailExist = true;
              //this.out_put = true;
            }
            else {
              this.Emailinvalid = false;
              //console.log("false");
              this.Emailok = true;

              // this.out_put = false;
            }

          },
          (err) => {
            alert('Email invalid');
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
  handleFileInput(files: FileList) {
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);

    this.fileName= 'https://storage.dhaar.pk/UserPics/' + localStorage.getItem('UserID') + '/' + this.filetoup[0].name;
    console.log('File Name is:' ,this.fileName);
this.uploadItemsToActivity();
}

uploadItemsToActivity() {
    console.log('I am in 1 Component');
    this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
      data => {
        this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
}


  checkButtonStep1() {
    if (this.model.storename != null && this.model.email != null && this.model.ownername != null && this.model.city != null && this.model.zipcode != null && this.model.personal != null && this.model.address != null && this.model.ownername != null) {

      if (!this.EmailExist && this.UserError && this.UserTyping && !this.Userloading) {
        this.step1button = true;
      } else {
        this.step1button = false;
      }


    }
  }

  save(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string) {
    
    if ( this.fileName) {
      //this.uploadItemsToActivity();
      this.Waitcall = true;
      console.log('I am in 1 Component');
      this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        data => {
         // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
          console.log('Successs' )
          this.obj.UserDetailsUpdate(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.fileName, this.USerNameID,this.complete,this.ISConfirmed).subscribe((response) => {
         console.log(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.fileName, this.USerNameID,this.complete,this.ISConfirmed)
          this.Error = false;
          this.Waitcall = false;
          this.Right = true;
        },
        error => {
          console.log(error);
        });


        },
        (err) => {
          this.Right = false;
          this.Waitcall = false;
          this.Error = true;
     
        },
        () => {

       
        }
      );
    } else {
      this.Waitcall = true;
      this.obj.UserDetailsUpdate(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.picname, this.USerNameID,this.complete,this.ISConfirmed).subscribe((response) => 
      {
        console.log(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.picname, this.USerNameID,this.complete,this.ISConfirmed)
         this.Error = false;
         this.Waitcall = false;
         this.Right = true;
       },
      //  error => {
      //    console.log(error);
      //  });
      
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
