// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UploadItemService } from '../file-uploads/upload-item-service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-usershipment',
  templateUrl: './usershipment.component.html',
  styleUrls: ['./usershipment.component.scss']
})
export class UsershipmentComponent implements OnInit {
  mask;
  addnewaddress = true;
  i;
  Inc;
  Right;
  file: File;
  GetallCat: any;
  Waitcall: boolean;
  Error: boolean;
  check= true;
  private base64textString = '';
  files: FileList;
  Mobile: string;
  Address: string;
  GetUSerDOne: any[];
  GetUSerAddress;
  ValueRec: Boolean = false;
  filetoup: FileList;
  fileName: any;
  ReservePrice = false;
  makeshippingaddress =false;
  makebilladdress =false;
  total_GetUSeradress;
  default_bill_address;
  default_shipment_address;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private obj: LoginService,
    private _nav: Router,
    private itemUploadService: UploadItemService,
    private httpService: LoginService

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
      console.log('hahaha', localStorage.getItem('UserID'));
this.viewuseraddress();
   
    }
  }

 viewuseraddress(){
  this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
    this.GetUSerAddress = resAddSlidersData;
    this.total_GetUSeradress = resAddSlidersData['Total Result']
    console.log(this.total_GetUSeradress, 'total')

    console.log('User Id is:', this.GetUSerAddress);
    this.ValueRec = true;
  });
 }
  checkedviewadd(){
    this.addnewaddress = true;
    this.makeshippingaddress = false;
  }
  save(FName: string, Address: string, province: string, City: string, Area: string,default_shipment_address, default_bill_address, Mobile) {
    console.log(FName, Address, province, City, Area, default_shipment_address, default_bill_address, Mobile)
    console.log('I am in 1 Component');
    // fullname.value,address.value,province.value,city.value,area.value,default_shipment_address.value,default_bill_address.value,phone_no.value
    console.log('Successs')
    this.httpService.Useraddressaddtocart(FName, Address, province, City, Area, this.default_shipment_address, this.default_bill_address, Mobile).subscribe((response) => {
      console.log(FName, Address, province, City, Area, this.default_shipment_address, this.default_bill_address, Mobile)

      this.obj.GetUSeraddress().subscribe(resAddSlidersData => {
        this.GetUSerAddress = resAddSlidersData;
        console.log('User Id is:', this.GetUSerAddress);
        this.ValueRec = true;
      });

    },
      error => {
        console.log(error);
      });





  }

  getfullname;
  getphone_no;
  getarea;
  getprovince;
  getaddress;
  getdefault_shipment_address;
  getdefault_bill_address;
  getuser_id;
  getid;
  getcity;

  Getallbuynowproductsdetail(val1, val2, val3, val4, val5, val6, val7, val8, val9,val10) {
    this.getid = val1;
    this.getfullname = val2;
    this.getphone_no = val3;
    this.getarea = val4;
    this.getcity = val5;
    this.getaddress = val6;
    this.getprovince = val7;

    this.getdefault_shipment_address = val8;
    this.getdefault_bill_address = val9
    // this.getdefault_bill_address = val8; 
    this.getuser_id = val10;
    console.log('fullname', val1, val2, val3, val4, val5, val6, val7, val8,val9,val10)
  }
  checked90(){
    this.makeshippingaddress = true;
    
    this.addnewaddress = false;
    this.default_shipment_address = true;
    this.check= false
  }
  checked91(){
    this.makebilladdress = true;
    this.addnewaddress = false;
    this.default_bill_address = true
    this.check= false
  }
  MakeDefluatShippment() {
   console.log('Successs')
       this.obj.GetUSerdetailsByUserIdupdate(this.getid,this.getfullname,this.getaddress,this.getprovince,this.getdefault_bill_address,this.getcity,this.getarea,this.default_shipment_address,this.getphone_no).subscribe((response) => {
      // this.obj.GetUSerdetailsByUserIdupdate(id, fullname, address, province, city, area, default_shipment_address, phone_no).subscribe((response) => {

     this.viewuseraddress();
     this.makebilladdress =false;
     this.makeshippingaddress=false;
     this.check= true;

    },
      error => {
        console.log(error);
      });



    () => {


    }

  }
  MakeDefluatbill() {
    console.log('Successs')
        this.obj.GetUSerdetailsByUserIdupdate(this.getid,this.getfullname,this.getaddress,this.getprovince,this.default_bill_address,this.getcity,this.getarea,this.getdefault_shipment_address,this.getphone_no).subscribe((response) => {
       // this.obj.GetUSerdetailsByUserIdupdate(id, fullname, address, province, city, area, default_shipment_address, phone_no).subscribe((response) => {
 
       
       this.viewuseraddress();
       this.makebilladdress =false;
     this.makeshippingaddress=false;
     this.check= true;
 
     },
       error => {
         console.log(error);
       });
 
 
 
     () => {
 
 
     }
 
   }
  checked7(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.default_bill_address = true;
       alert(this.default_bill_address)
    }
    else if (event.target.checked == false){
      this.default_bill_address = false;
    }
   
    console.log(this.default_bill_address)
}
checked8(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.default_shipment_address = true;
     alert(this.default_shipment_address)
  }
  else if (event.target.checked == false){
    console.log(event.target.checked)
    this.default_shipment_address = false;
   alert(this.default_shipment_address)
  }
 
  console.log(this.default_shipment_address)
}
  AddReservePriceFun() {
    if (this.ReservePrice === true) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }
  handleFileInput(files: FileList) {
    this.filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);

    this.fileName = 'https://storage.dhaar.pk/UserPics/' + localStorage.getItem('UserID') + '/' + this.filetoup[0].name;
    console.log('File Name is:', this.fileName);
    this.uploadItemsToActivity();

  }

  uploadItemsToActivity() {
    console.log('I am in 1 Component');
    this.itemUploadService.PostImage(this.filetoup, 'UserPics', localStorage.getItem('UserID')).subscribe(
      data => {
        this.obj.UserDetailsUpdatePic(this.GetUSerDOne['user'], this.fileName).subscribe();
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
  }

  save2(id, fullname: string, address: string, province: string, default_bill_address:string, city: string, area: string, default_shipment_address: string, phone_no: string) {

    this.Waitcall = true;
    console.log('I am in 1 Component');

    console.log('Successs')

    this.obj.GetUSerdetailsByUserIdupdate(id, fullname, address, province,default_bill_address ,city, area, default_shipment_address, phone_no).subscribe((response) => {
      this.Error = false;
      this.Waitcall = false;

    },
      error => {
        console.log(error);
      });



    () => {


    }

  }
 


  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.', '', 'success');
    }
  }


}
