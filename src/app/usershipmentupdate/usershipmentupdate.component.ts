// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UploadItemService} from '../file-uploads/upload-item-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usershipmentupdate',
  templateUrl: './usershipmentupdate.component.html',
  styleUrls: ['./usershipmentupdate.component.scss']
})
export class UsershipmentupdateComponent implements OnInit {

  Inc;
  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  files: FileList;
  Mobile: string;
  Address: string;
  GetUSerDOne: any [];
  GetUSerAddress;
  mask;
  Right;
  ValueRec: Boolean = false;
  filetoup: FileList;
  fileName: any;
  ReservePrice = false;
  private sub: any;
  CatName: string;
  ProID:string;
  id:number;
  USerNameID: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private route: ActivatedRoute,
              private _nav: Router,
              private itemUploadService: UploadItemService

              ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      console.log('hahaha', localStorage.getItem('UserID'));
      this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        // this.CatName = params['CatName'] || '0';
        this.ProID = params['ProID'] || '0';
        console.log(this.ProID)
      });
    // this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
    //   this.GetUSerDOne = resSlidersData;
    //   console.log('User Id is:', this.GetUSerDOne);
     
    //   this.ValueRec = true;
    // });
    this.obj.GetUSeraddressbyID(this.ProID).subscribe(resAddSlidersData => {
      this.GetUSerAddress = resAddSlidersData;
      this.USerNameID= this.GetUSerAddress['user_id']
      this.id =this.GetUSerAddress['id']
//       address: "random"
// area: "samanabad"
// city: "fsd"
// default_shipment_address: true
// fullname: "hassan"
// id: 2
// phone_no: 30112889666
// province: "custom"
// user_id: 303
      console.log('proid Id is:', this.GetUSerAddress);
      this.ValueRec = true;
    });
    }
  }
  // GetUSerdetailsByUserIdupdate
  save(fullname:string,phone_no:string,province:string,default_bill_address:string,city:string,area:string,default_shipment_address:string,address:string) {
      //this.uploadItemsToActivity();
      this.Waitcall = true;
      console.log('I am in 1 Component');
      // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        // data => {
         // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
          console.log('Successs' )
       
          this.obj.GetUSerdetailsByUserIdupdate(this.id,fullname,address,province,default_bill_address,city,area,default_shipment_address,phone_no).subscribe((response) => {
        //  console.log(this.id,FName, Lname, Country, State, City, Zip, Mobile, Address, this.Vendor,this.fileName, this.USerNameID,this.complete,this.ISConfirmed)
          this.Error = false;
          this.Waitcall = false;
          // this.Right = true;
        },
        error => {
          console.log(error);
        });


       
        () => {

       
        }
     // );
    } 

  




  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }




  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }


}
