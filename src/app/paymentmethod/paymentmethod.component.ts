// import { Component, OnInit, NgModule } from '@angular/core';
import { Component, OnInit,NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms'
 
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';
import { Observable } from 'rxjs';
import { AdService } from '../post-ad/ad.services';
import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
declare const $: any;
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Discover', viewValue: 'Discover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  model: any;
  isright;
  viewtotal;
  viewid;
  viewinvoice;
 
  cardtype;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder,
    private PostAdd: AdService,   private httpbuyerService: BuyerDashboardServices,
    private httpService: LoginService,) {  
    
    }
   
  signupForm=new FormGroup({
    expiry : new FormControl('',[
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
    ]),
    nickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
    ]),
    cardholdername: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
     
    ccv: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv4: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    cardnumber: new FormControl('', [
      //Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    cardnumber4: new FormControl('', [
      //Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    city: new FormControl('',[
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern("[a-zA-Z ]+")
    ]),
    card_type: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    default: new FormControl(),
    province: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    country: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    

   
  })
  card_type = new FormControl();
  
  cardholdername;
 

  ngOnInit() {
    // this.signupForm = this.fb.group({

      this.signupForm.controls['default'].setValue(false);
      this.cardnumber = true;
      this.cardnumber4 = false;
      this.ccv = true;
      this.ccv4 = false;
      this.viewtotal = localStorage.getItem("totalprice");
      this.viewinvoice = localStorage.getItem("InvoiceID")
      this.get();
    //   'cardholdername': ['', Validators.compose([Validators.required])],
    //   'ccv': ['', Validators.compose([Validators.required])],
    //   'expiry': ['', 
    //    Validators.required,
    //    Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')],

     
    //   'card_type': ['', Validators.compose([Validators.required])],
    //   'nickname': ['', Validators.compose([Validators.required])],
    //   'default': ['', Validators.compose([Validators.required])],
    //   'country': ['', Validators.compose([Validators.required])],
    //   'province': ['', Validators.compose([Validators.required])],
    //   'city': ['', Validators.compose([Validators.required])],
    //   'cardnumber': ['', Validators.compose([Validators.required])],

 
  }
  public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  expiry
  chek(val) {
    this.expiry = val.toString().slice(3, 5);
    console.log(this.expiry, 'jj')
  }
  public masks = function (rawValue) {

    // add logic to generate your mask array  
    if (rawValue && rawValue.length > 0) {
      if (rawValue[0] == '0' || rawValue[5] == '1') {
        return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
      } else {
        return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
      }
    }
    return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

  }
cardnumber;
cardnumber4;
ccv;
ccv4;

  ShowButton(card_type) {
    alert(this.cardtype)
    this.cardtype = card_type;
    if (card_type == "American Express") {
      // alert(card_type)
      this.cardtype = card_type;
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber = false;
      this.signupForm.controls.cardnumber.reset();
      this.cardnumber4 = true;
      this.ccv = false;
      this.signupForm.controls.ccv.reset();
      this.ccv4 = true;
      console.log(card_type)
    }
    else if (card_type == "Visa") {
      this.cardmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.signupForm.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.ccv4 = false;
      this.signupForm.controls.ccv4.reset();
      this.ccv = true;
    } else if (card_type == "Master") {
      this.cardmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.signupForm.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.ccv4 = false;
      this.signupForm.controls.ccv4.reset();
      this.ccv = true;
    } else {
      this.cardmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.signupForm.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.ccv4 = false;
      this.signupForm.controls.ccv4.reset();
      this.ccv = true;
    }
  }
  save(){
    console.log(this.signupForm.value)
    // cardnumber,ccv,expiry,card_type,nickname,check,country,province,city,cardholdername
    this.PostAdd.addpaymentmethod(this.signupForm.value['cardnumber'],this.signupForm.value['ccv'],
    this.signupForm.value['expiry'].split('/').join(''),
    this.signupForm.value['card_type'],
    this.signupForm.value['nickname'],
    this.signupForm.value['default'],
    this.signupForm.value['country'],
    this.signupForm.value['province'],
    this.signupForm.value['city'],
    this.signupForm.value['cardholdername'],
     ).subscribe(
      data => {
        console.log(data)
      }
    
      
      );
    // console.log(this.model.cardholdername)
  }
  GetUSeradress;
viewcarname;
viewcity;
viewprovince;

  get() {
    this.httpService.viewcarddetial().subscribe(resSlidersData => {
      // this.httpService.GetUSerdetailsByUserId().subscribe(resSlidersData => {
      this.GetUSeradress = resSlidersData;
      console.log(this.GetUSeradress)
//       CardHolderName: "Ehtisham"
// City: "Jauharabad"
// Country: "Pakistan"
// Province: "Punjab"
// cardNumber: "************1344"
// card_type: "Visa"
// ccv: "***"
// default: false
// expiryDate: "0822"
// id: 12
// nickname: "Shami"
     
      
    });
  }
  get_id(val1){
    console.log(val1)
    this.viewid = val1
  }
  ShippingDetails() {

    // this.exp = this.model.expiry_month + this.model.expiry_year;
    // this.paymenttype = "online";
    // this.card_type = "visa";
    // this.currency_code = "USD"
    // this.price = this.Total;
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.model);
      console.log('id value is:', localStorage.getItem('UserID'));
      this.httpbuyerService.paymentmethod(this.viewid,this.viewtotal,this.viewinvoice).subscribe(data => {

        // this.httpbuyerService.SendEmail(localStorage.getItem('InvoiceID')).subscribe(data => {
          console.log('cartproduct Successssssssss');
        alert("paymentmethod")
             Swal.fire('Your Order Has Been Placed', '', 'success');
             
      }, (err) => {

        alert('false');
       
        
      },
    );

    
   

  }
      
      
  }

}
