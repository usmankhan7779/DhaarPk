import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from '../log-in/log-in.services';
import {Http , Headers , Response} from '@angular/http';
import Swal from 'sweetalert2';
import {HttpService} from '../services/http-service';
import {Observable} from 'rxjs/Rx';
// import { UploadItemService } from '../file-uploads/upload-item-service';
import {UploadItemService} from '../file-uploads/upload-item-service';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {
  model: any = {};
  public mask = [  /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  Waitcall = false;
  step1button = false;
  step2button = false;
  UserError = false;
  UserTyping = false;
  Userloading= false;
  EmailExist= false;
  Emailok= false;
  Emailinvalid= false;
  fbrregister :boolean= true;
  uploadFile: any;
  sizeLimit = 2000000;
  ALLbase64textStringforPic= {0: 'dfghjk'};
  file: any;
  file1: any;
  url: any=[];
  files: FileList;
  private base64textString= '';
  PictureCheck = false;
  PicCounter: any =0;
  filetoup1:any=[];
  filetoup:any=[];
  SessionstoreName: any;
  seller = false;
  fileName = '';
  // files: FileList;
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private obj: LoginService,
               private _http: HttpService,
               private router: Router,
              //  private Profile: LoginService,
               private itemUploadService: UploadItemService ) {
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

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
        this.obj.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });

    }
    msg;

  save() {

    if ( this.model.terms ) {
      this.Waitcall = true;
      if ( this.fileName) {
        console.log('Inside base 64');
        
        this.obj.StoreRegistrationPic(this.model, this.fileName).subscribe((response) => {
          this.msg =response;
          alert(this.msg)
          if(this.msg == "Store Added Successfully..!!")
          {
            Swal.fire('You have been successfully Regsiter you Store in Dhaar.','','success');
            this.router.navigate(['/seller-product-setting-store']);
          }
          
        });

       
      } else {
        this.obj.StoreRegistration(this.model).subscribe(
          (response) => {
            this.msg=response;
            alert(this.msg)
            if(this.msg == "Store Added Successfully..!!")
            {
              Swal.fire('You have been successfully Regsiter you Store in Dhaar.','','success');
              this.router.navigate(['/seller-product-setting-store']);
            }
           
          }
        );
        // Swal.fire('You have been successfully Regsiter you Store in Dhaar.','','success');
        // this.router.navigate(['/seller-product-setting-store']);
      }
    } else {
      alert('You must agree to the terms  first.');
    }
  }
  onChangestore(store) {
    if (store !== '') {


      if (store.length > 1 && store.length < 30) {
        if (store.match('^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$')) {
          this.Userloading = true;
          this.UserTyping = true;

          this.obj.verifyStoreName(store).subscribe((response) => {
              /* this function is executed every time there's a new output */
             console.log("VALUE RECEIVED: "+response);
              if (response !== true) {

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

  OnEmailChangeEvent() {
    this.EmailExist = false;
    this.Emailok = false;
  }


  closeregister() {
    // alert(this.model.fbrunregister)
    this.step2button = !this.step2button;

    this.model.fbrregister = false;
  }
  closecheck() {
    this.step2button = false;

    // alert("hi")
  this.model.fbrunregister = false;
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
  checkButtonStep2() {
    if (this.model.fbrname != null && this.model.cnic != null && this.model.strn != null ) {
      this.step2button = true;
    }
  }

  ngOnInit() {
    $(".mat-input").focus(function(){
      $(this).parent().addClass("is-active is-completed");
    });
    
    $(".mat-input").focusout(function(){
      if($(this).val() === "")
        $(this).parent().removeClass("is-completed");
      $(this).parent().removeClass("is-active");
    })
    this.SessionstoreName= localStorage.getItem('StoreName');
      if (this.SessionstoreName === null) {
        this.seller = false;
      } else {
        this.seller = true;
      }
this.model.fbrregister = false;
    this.model.fbrunregister = false;
this.model.terms = true;
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }
}
