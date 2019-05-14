import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActiveAdServices} from '../active-ad/active-ad.services';
import {Router} from '@angular/router';
import {AdService} from '../post-ad/ad.services';
import Swal from 'sweetalert2';
import { CategoryServices } from '../category-detail/category-detail.services';
import { StoredetailsService } from '../store-all-details/storedetails.service';
import { LoginService } from '../log-in/log-in.services';

@Component({
  selector: 'app-seller-product-setting-store',
  templateUrl: './seller-product-setting-store.component.html',
  styleUrls: ['./seller-product-setting-store.component.scss']
})
export class SellerProductSettingStoreComponent implements OnInit {

 
  GetALLBuyNowProductss: any = [];
  storename: any;
  step1 = true;
stroeid :any;
Error;
  // storname;
  OwnerName:any;
  BusinessEmail:any;
  Zip:any;
  city;
  Right;
  ownerContactNum;
  businessPhone;
  address;
  fbrRegister="False";
  legalName;
  nTN;
  sTRN;
  i;
  Waitcall;
  storestatus;
  bank;
 bankid;
 storeid;
 accounttitle;
 accountnumber;
 bankname;
 branchname;
 branchcode;
 image;
  // Tv.id,Tv.StoreID_id,Tv.AccountTitle,Tv.AccountNumber,Tv.BankName,Tv.BranchName,Tv.BranchCode
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private GetProducts: StoredetailsService,
              private savedetail:LoginService,
              private GetCat:AdService,
              private Category: CategoryServices,
              private GetWatch:ActiveAdServices) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.GetProducts.GetAllStoreByStorenames().subscribe(resSlidersData => {

        this.GetALLBuyNowProductss = resSlidersData.Results;
        
        console.log(this.GetALLBuyNowProductss,'get store')
      });
      // this.storename=localStorage.getItem("StoreName");
      // console.log(this.storename)
    }
  }
  // Getallbuynowproductsdetail  (TvVideoaudio88.id,TvVideoaudio88.StoreName,TvVideoaudio88.OwnerName
  //   ,TvVideoaudio88.BusinessEmail,TvVideoaudio88.Zip
  //   ,TvVideoaudio88.City,TvVideoaudio88.OwnerContactNum
  //   ,TvVideoaudio88.BusinessPhone,TvVideoaudio88.Address
  //   ,TvVideoaudio88.FbrRegister,TvVideoaudio88.LegalName
  //   ,TvVideoaudio88.NTN,TvVideoaudio88.STRN
  //   ,TvVideoaudio88.activestore)"  
 Getallbuynowproductsdetail(val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,
  val16,val17,val18,val19,val20,val21,val22){
   this.stroeid= val1;
   this.storename = val2;
   this.OwnerName =val3;
   this.BusinessEmail = val4;
   this.Zip= val5;
   this.city= val6
   this.ownerContactNum = val7;
   this.businessPhone = val8;
   this.address = val9;
  //  this.fbrRegister = val10;
   this.legalName = val11;
   this.nTN= val12;
   this.sTRN = val13;
   this.storestatus =val14;
   this.bankid =val15;
   this.storeid=val16;
   this.accounttitle=val17;
   this.accountnumber=val18;
   this.bankname=val19;
   this.branchname=val20;
   this.branchcode=val21;
   this.image= val22
    // alert(val15)
   console.log(val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,
    val16,val17,val18,val19,val20,val21,val22)

  //  (TvVideoaudio88.id,TvVideoaudio88.OwnerName
  //   ,TvVideoaudio88.BusinessEmail,TvVideoaudio88.Zip
  //   ,TvVideoaudio88.City,TvVideoaudio88.OwnerContactNum
  //   ,TvVideoaudio88.BusinessPhone,TvVideoaudio88.Address
  //   ,TvVideoaudio88.FbrRegister,TvVideoaudio88.LegalName
  //   ,TvVideoaudio88.NTN,TvVideoaudio88.STRN
  //   ,TvVideoaudio88.activestore)

 }
 checked3(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.fbrRegister = "True";
      console.log(this.fbrRegister,'true fbr register')
      // alert(this.fbrRegister)
      //this.setPage(1);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      this.fbrRegister="False";
      console.log(this.fbrRegister,'false fbr register')
      // alert(this.fbrRegister)
      //this.setPage(1);
  }
  //console.log(this.months3)
}
 save(id,SName:string,OName:string,Email:string,zip:string,City:string,ownercontactnum:string,Businessphone:string,Address:string,fbrregister:string,Legalname:string,ntn:string,strn:string,atitle:string,accountnum:string,banknam:string,branchnam:string,branchcod:string,pic:string) {
    
  // if ( this.fileName) {
    //this.uploadItemsToActivity();
    // this.Waitcall = true;
    console.log('I am in 1 Component');
    // alert(this.fbrRegister)
    // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
      // data => {
       // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        console.log('Successs' )
        // SName,OName,Email,zip,City,ownercontactnum,Businessphone,Address,fbrregister,Legalname,ntn,strn,StoreStatus,BankId,Sid,atitle,accountnum,banknam,branchnam,branchcod,pic) 
        this.savedetail.sellerstoreinformationupdate(id,SName,OName,Email,zip,City,ownercontactnum,Businessphone,Address,this.fbrRegister,Legalname,ntn,strn,atitle,accountnum,banknam,branchnam,branchcod,pic).subscribe((response) => {
       console.log(SName,OName,Email,zip,City,ownercontactnum,Businessphone,Address,fbrregister,Legalname,ntn,strn,atitle,accountnum,banknam,branchnam,branchcod,pic)
        // this.Error = false;
        // this.Waitcall = false;
        // this.Right = true;
        Swal.fire('Changes has been Saved','','success');
      },
      error => {
        console.log(error);
      });


  
   // );
 
}
}
