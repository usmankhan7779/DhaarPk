import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UploadItemService} from '../file-uploads/upload-item-service';
import Swal from 'sweetalert2';
import { SharedData } from '../shared-service';


@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {
  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  private base64textString= '';
  files: FileList;
  Mobile: string;
  Address: string;
  GetUSerDOne: any [];
  Results:any;
  GetUSerAddress:any[];
  ValueRec: Boolean = false;
  filetoup: FileList;
  fileName: any;
  total:any;
  // Results;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private obj: LoginService,
              private _nav: Router,
              public _shareData: SharedData,
              private itemUploadService: UploadItemService

              ) { }

  ngOnInit() {
    
    if (isPlatformBrowser(this.platformId)){
      if (localStorage.getItem('UserID') !== null) {
        this._shareData.currentMessagetotal.subscribe(message => this.total = message)
    }
    else{
      this.total=0
    }
  
      console.log('hahaha', localStorage.getItem('UserID'));
    this.obj.GetUSerdetailsByUserId().subscribe(resSlidersData => {
      this.GetUSerDOne = resSlidersData;
      console.log('User Id is:', this.GetUSerDOne);
      // this.FName = this.GetUSerDOne['Fname'];
      // this.LName = this.GetUSerDOne['Lname'];
      // this.Country = this.GetUSerDOne['Country'];
      // this.State = this.GetUSerDOne['State'];
      // this.City = this.GetUSerDOne['City'];
      // this.Zip = this.GetUSerDOne['Zip'];
      // this.Mobile = this.GetUSerDOne['Mobile'];
      // this.Address = this.GetUSerDOne['Address'];
      this.ValueRec = true;
    });
    this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
      this.GetUSerAddress = resAddSlidersData['Results'];
      console.log('User Id is:', this.GetUSerAddress);
      this.ValueRec = true;
    });
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
        console.log(data)
        alert(data)
        this.obj.UserDetailsUpdatePic(this.GetUSerDOne['user'],this.fileName).subscribe();
        // this.Profile.UserDetailsUpdatePic(this.GetUSerDOne.user,this.fileName).subscribe();
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
