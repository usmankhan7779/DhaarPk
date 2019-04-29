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
  selector: 'app-usershipment',
  templateUrl: './usershipment.component.html',
  styleUrls: ['./usershipment.component.scss']
})
export class UsershipmentComponent implements OnInit {

  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  private base64textString= '';
  files: FileList;
  Mobile: string;
  Address: string;
  GetUSerDOne: any [];
  GetUSerAddress;
  ValueRec: Boolean = false;
  filetoup: FileList;
  fileName: any;
  ReservePrice = false;
  total_GetUSeradress;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,
              private itemUploadService: UploadItemService,
              private httpService: LoginService

              ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      console.log('hahaha', localStorage.getItem('UserID'));
    // this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
    //   this.GetUSerDOne = resSlidersData;
    //   console.log('User Id is:', this.GetUSerDOne);
    
    //   this.ValueRec = true;
    // });
    this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
      this.GetUSerAddress = resAddSlidersData;
      this.total_GetUSeradress = resAddSlidersData['Total Result']
      console.log(this.total_GetUSeradress,'total')
      // alert(this.total_GetUSeradress)
      console.log('User Id is:', this.GetUSerAddress);
      this.ValueRec = true;
    });
    }
  }
  
  save(FName: string,Address:string, province: string,  City: string, Area: string,  Shipmentaddress,Shipmentbilladdress,Mobile) {
    
    // if ( this.fileName) {
      //this.uploadItemsToActivity();
      // this.Waitcall = true;
      console.log('I am in 1 Component');
      // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
        // data => {
         // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
          console.log('Successs' )
          // fullname.value,address.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,phone_no.value
          // fullname.value,phone_no.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,address.value
          // fullname.value,address.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,phone_no.value
          this.httpService.Useraddressaddtocart(FName,Address,province,City,Area,Shipmentaddress,Shipmentbilladdress,Mobile).subscribe((response) => {
         console.log(FName,Address,province,City,Area,Shipmentaddress,Shipmentbilladdress,Mobile)
         
         this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
          this.GetUSerAddress = resAddSlidersData;
          console.log('User Id is:', this.GetUSerAddress);
          this.ValueRec = true;
        });
          // this.Error = false;
          // this.Waitcall = false;
          // this.Right = true;
        },
        error => {
          console.log(error);
        });


    
     // );
   
  }

  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
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
        this.obj.UserDetailsUpdatePic(this.GetUSerDOne['user'],this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
  }

  // save() {
  //   if (isPlatformBrowser(this.platformId)){
  //   this.obj.UserDetailsUpdate(this.FName, this.LName, this.Country, this.State, this.City, this.Zip, this.Mobile, this.Address, this.base64textString, localStorage.getItem('UserID')).subscribe(data => this.GetallCat = data);}
  // }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
    localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }


}
