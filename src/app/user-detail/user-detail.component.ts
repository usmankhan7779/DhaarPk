import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
 
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  model: any = {};
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
 
  step1 = true;
  step2 = false;
  step3 = false;
  sub: any;
  step4 = false;
  step1button = false;
  step2button = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Inc= false;
  Waitcall= false;
  Emailok= false;
  Emailinvalid= false;
  private base64textString= '';
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
              private _nav: Router,
              private Profile: LoginService,
              private itemUploadService: UploadItemService,
              private _nav1: ActivatedRoute) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.sub = this._nav1
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.Inc = params['Inc'] || false;
        });

      // this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
      console.log(this.USerNameID)
      
      // GetUserDetailByName
      this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
        this.GetUSerdetails = resSlidersData;
        this.id= this.GetUSerdetails['id']
        this.Vendor= this.GetUSerdetails['Vendor']
        this.complete = this.GetUSerdetails['Complete']
        this.ISConfirmed = this.GetUSerdetails['ISConfirmed']
        this.picname= this.GetUSerdetails['Pic']
        this.USerNameID= this.GetUSerdetails['user_id']

        // this.id= this.GetUSerdetails['id']
        // this.Vendor= this.GetUSerdetails['Vendor']
        // this.complete = this.GetUSerdetails['Complete']
        // this.ISConfirmed = this.GetUSerdetails['ISConfirmed']
        // this.picname= this.GetUSerdetails['Pic']
        // this.USerNameID= this.GetUSerdetails['user_id']
        // console.log(this.GetUSerdetails,'getuser');
        console.log(this.id)
        // this.Username= this.GetUSerdetails['user_id']

      });
    }
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



  checkButtonStep1() {
    if (this.model.storename != null && this.model.email != null && this.model.ownername != null && this.model.city != null && this.model.zipcode != null && this.model.personal != null && this.model.address != null && this.model.ownername != null) {

      if (!this.EmailExist && this.UserError && this.UserTyping && !this.Userloading) {
        this.step1button = true;
      } else {
        this.step1button = false;
      }


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

    save(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string) {
    
      if ( this.fileName) {
        //this.uploadItemsToActivity();
        this.Waitcall = true;
        console.log('I am in 1 Component');
        this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
          data => {
           // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
            console.log('Successs' )
            // save(FName.value,Lname.value,Country.value,State.value,City.value, zipcode.value, personal.value, address.value)
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
      } 
      else {
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
  




  // save(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string) {
  //   // this.
  //    this.Waitcall = true;
  //   // (FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Pic: string, Username: string) {
  //   if ( this.base64textString) {

  //     this.obj.UserDetailsUpdate(FName, Lname, Country, State, City, Zip, Mobile, Address, this.base64textString, this.USerNameID).subscribe((response) => {
  //         /* this function is executed every time there's a new output */
  //         // console.log("VALUE RECEIVED: "+response);
  //         this.Error = false;
  //         this.Waitcall = false;
  //         this.Right = true;



  //       },
  //       (err) => {
  //         this.Waitcall = false;
  //         this.Right = false;
  //         this.Error = true;
  //         /* this function is executed when there's an ERROR */
  //         //   console.log("ERROR: "+err);
  //       },
  //       () => {

  //         /* this function is executed when the observable ends (completes) its stream */
  //         //   console.log("COMPLETED");
  //       }
  //     );
  //   } else {

  //     this.obj.UserDetailsUpdateWithOutPic(FName, Lname, Country, State, City, Zip, Mobile, Address, this.USerNameID).subscribe((response) => {
  //         /* this function is executed every time there's a new output */
  //         // console.log("VALUE RECEIVED: "+response);
  //         this.Waitcall = false;
  //         this.Error = false;
  //         this.Right = true;

  //       },
  //       (err) => {
  //         this.Waitcall = false;
  //         this.Right = false;
  //         this.Error = true;

  //         /* this function is executed when there's an ERROR */
  //         //   console.log("ERROR: "+err);
  //       },
  //       () => {
  //         /* this function is executed when the observable ends (completes) its stream */
  //         //   console.log("COMPLETED");
  //       }
  //     );
  //   }

  // }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
