import { Component, OnInit, Renderer, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { LoginService } from '../log-in/log-in.services';
import { ActiveAdServices } from '../active-ad/active-ad.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedData } from '../shared-service';

import { BuyerDashboardServices } from '../buyer-dashboard/buyer-dashboard.services';
import Swal from 'sweetalert2';
import { HomeService } from '../home/home.services';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css'],
  providers: [LoginService, BuyerDashboardServices]
})
export class Checkout2Component implements OnInit {
  CartedProduct: any = [];
  Total: number;
  subtotal:number;
  TotalDiscount: number;
  public mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public phonemask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  private sub: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  model: any = {};
  GetUSeradress: any = [];
  Getinvoiceamount: any = [];
  OrderInvoiceid;
  GetUSerDOne: any = [];
  GetUser: any = [];
  GetUSallerCoupon: any = [];
  mymodel: any = {};
  LoginName: string;
  login: string;
  CheckoutMethod = false;
  BillingMethod = false;
  GuestBillingMethod = false;
  catid: '';
  PaymentMethod = false;
  status = 1;
  orderreview = true;
  LoggedIn = false;
  user: any;
  BillingMethodButton = true;
  GuestButton = false;
  PaymentatHme = false;
  OrderPlaced = false;
  GuestOrderPlaced = false;

  InvoiceIDSet: any;
  id: any;
  payaddressid;
  ProPics: any = [];
  qty ;
  currentindex: any;
  //sub: any;
  CatId: any;
  fullname: '';
  address: '';
  Provinces: '';
  city: '';
  area: '';
  default_shipment_address: '';
  phone_no: '';
  user_id: '';
  Shipmentaddress = "False";
  Shipmentbilladdress = "False";
  Error;
  Right;
  Waitcall;
  list :any=[];
  i;
  // //     "id": 2,
  // //     "fullname": "hassan",
  // //     "address": "madina",
  // //     "province": "custom",
  // //     "city": "fsd",
  // //     "area": "samanabad s",
  // //     "default_shipment_address": false,
  // //     "phone_no": 30112889666,
  // //     "user_id": 303
  total: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, public _shareData: SharedData,
    private Renderer123: Renderer,
    private route: ActivatedRoute,
    private _nav: Router,
    private httpService: LoginService,
    private httpServiceads: ActiveAdServices,
    private Profile: LoginService,
    private GetAdd: HomeService,
    private httpbuyerService: BuyerDashboardServices) {

  }
  total_GetUSeradress;
  

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._shareData.currentMessagetotal.subscribe(message => this.total = message)

      console.log('Yahoooo', this.OrderPlaced);
      this.sub = this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.login = params['login'] || '0';
          console.log('Yahoooo', this.login);

          if (this.login === 'yes') {
            this.orderreview = false;
            this.LoginName = localStorage.getItem('UserName');

            this.LoggedIn = true;
            this.PaymentMethod = true;
            this.BillingMethod = true;
            this.user = localStorage.getItem('UserID');
            // post_shipment_details
            this.httpService.GetUSerdetailsByUserId1().subscribe(resSlidersData => {
              // this.httpService.GetUSerdetailsByUserId().subscribe(resSlidersData => {
              this.GetUSeradress = resSlidersData;
             
              this.total_GetUSeradress = resSlidersData['Total Result']
              console.log(this.total_GetUSeradress, 'ddddddddddddddddddd')
              //  this.GetUser= this.GetUSerDOne.Results 
              console.log(this.GetUSeradress.Results);
              console.log('User done info are:', this.GetUSeradress.Results);
              // alert(this.GetUser)
              if (this.GetUSeradress['Complete'] === false) {
                this._nav.navigate(['/user-detail'], { queryParams: { Inc: 'true' } });
              }
            });

          }
        });

     this.viewCheckOut();
      this.get()
      // this.httpService.GetUSerdetailsByUserId1().subscribe(resSlidersData => {
      //   this.GetUSeradress = resSlidersData;
      //  // this.GetUSeradress= resSlidersData;
      //   this.total_GetUSeradress=resSlidersData['Total Result']
      //   console.log(this.total_GetUSeradress,'ddddddddddddddddddd')
      // });

      // for (const {item,index} of this.CartedProduct['products'].map((item,index) => ({item,index}))) {
      //   if(index === this.CartedProduct['products'].length-1) {
      //     console.log('item is:  ', item, '  Index is:  ', index);
      //   }
      // }

    }
  }
  quantites;
  viewCheckOut(){
    this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

      this.CartedProduct = resSlidersData;
      console.log(this.CartedProduct.Results, 'cart')
      this.total = this.CartedProduct['Total Result']
      // for(const checkout of this.CartedProduct.Results){
      //   // {"ProductID": "123","UserID":"338","Qty":"1","sellerid":"hassan"}
      //   this.subtotal=checkout.product.FixedPrice * checkout.Quantity
        // alert(checkout.Quantity)
      //   this.list.push({
      //     "ProductID":checkout.product.ProductID,          
      //     "sellerid":checkout.product.User_ID,
      //     "Qty":checkout.Quantity,
      //     "proprice": this.subtotal
      
      //   })
      //   console.log(this.list,'fatimaaaaaaaaaa')
      // //  this.list.push(checkout.product.ProductID,checkout.Quantity,checkout.product.User_ID)
      // }
      this._shareData.watchtotal(this.total);

      // this.CartedProduct = JSON.parse(localStorage.getItem('Cartdata'));
      console.log('Carted products are:', this.CartedProduct);
      for (const tmp1 of this.CartedProduct.Results) {
        console.log('Temp1 is:', tmp1);
        console.log('Values are:', tmp1.product.Pic);
        this.ProPics.push(tmp1.product.Pic.split(',')[0]);
      }
      console.log('Pics are are:', this.ProPics);


      this.Total = 0;
      for (const tmp of this.CartedProduct.Results) {
      //  this.subtotal = (tmp.product.FixedPrice * tmp.Quantity)
      //  alert(this.subtotal)
        this.Total = this.Total + (tmp.product.FixedPrice * tmp.Quantity);
        console.log(tmp.product.FixedPrice, 'total')
      }
    });
  }
   SaveProduct(id, val1, val2, val3, val4, val5, val6, val7, val8) {
    this.catid = id;
    this.fullname = val1;
    this.address = val6;
    this.Provinces = val5;
    this.city = val4;
    this.area = val3;
    this.default_shipment_address = val7;
    this.phone_no = val2;
    this.user_id = val8;


    console.log(val1, val2, val3, val4, val5, val6, val7, val8)
    console.log('id : ' + this.catid);
    console.log(this.fullname)
  }
getproductsid;
getqty;
getcartid;
  SaveProduct2(val1,val2,val3) {
    // SaveProduct1(abc.product.ProductID,qty.value){}
    this.getproductsid = val1;
    this.getqty=val2;
    // this.CartedProduct.Results = this.getcartid.id;
    this.getcartid = val3
    console.log(val1,val2,val3)
         this.httpbuyerService.Updatequantity(this.getcartid,this.getqty).subscribe((response) => {
          //  console.log(SName,OName,Email,zip,City,ownercontactnum,Businessphone,Address,fbrregister,Legalname,ntn,strn,atitle,accountnum,banknam,branchnam,branchcod,pic)
           console.log(response)
           console.log(this.getproductsid,this.getqty,this.getcartid)
           this.viewCheckOut();
           Swal.fire('Changes has been Saved','','success');
        }
         );
        // ,
        // error => {
        //   console.log(error);
        // });

        
         
           
   
  }

  onChange(qty, Abc: any, value: any) {
// alert(value)
    for (const tmp of this.CartedProduct.Results) {
      if (tmp.ProductID === Abc) {
        tmp.Quantity = value;
        // this.list.Qty=value;
        
      }
      console.log(this.list.Qty)

    }
    this.Total = 0;
    for (const tmp of this.CartedProduct.Results) {
      this.Total = this.Total + (tmp.product.FixedPrice * tmp.Quantity);
    }
  }

  status_900: boolean = false
  AddReservePriceFun1() {
    if (this.status_900 === true) {
      this.status_900 = true;
    } else {
      this.status_900 = false;
    }
  }
  checked3(event, i) {
    if (event.target.checked == true) {
      console.log(event.target.checked)
      this.Shipmentaddress = "True";
      console.log(this.Shipmentaddress, 'true fbr register')
      //alert(this.Shipmentaddress)
      //this.setPage(1);
    }
    else if (event.target.checked == false) {
      console.log(event.target.checked)
      this.Shipmentaddress = "False";
      console.log(this.Shipmentaddress, 'false fbr register')
      // alert(this.Shipmentaddress)
      //this.setPage(1);
    }
    //console.log(this.months3)
  }

  checked4(event, i) {
    if (event.target.checked == true) {
      console.log(event.target.checked)
      this.Shipmentbilladdress = "True";
      console.log(this.Shipmentbilladdress, 'true fbr register')
      // alert(this.Shipmentbilladdress)
      //this.setPage(1);
    }
    else if (event.target.checked == false) {
      console.log(event.target.checked)
      this.Shipmentbilladdress = "False";
      console.log(this.Shipmentbilladdress, 'false fbr register')
       
    }
     
  }
  viewidofshippmentaddress;
  get() {
    this.httpService.GetUSerdetailsByUserId1().subscribe(resSlidersData => {
      // this.httpService.GetUSerdetailsByUserId().subscribe(resSlidersData => {
      this.GetUSeradress = resSlidersData;
      this.payaddressid= this.GetUSeradress.Results;
      // if (this.payaddressid.default_shipment_address == true){

      // }
      for (const tmps of this.GetUSeradress.Results) {
        // this.subtotal = (tmp.product.FixedPrice * tmp.Quantity)
       //  alert(this.subtotal)
        //  this.Total = this.Total + (tmp.product.FixedPrice * tmp.Quantity);
         console.log(tmps.default_shipment_address, 'total')
         if(tmps.default_shipment_address == true){
          this.viewidofshippmentaddress = tmps.id;

            alert(tmps.id)
         }
       }
      // console.log(this.payaddressid.default_shipment_address == )
      // alert(this.payaddressid.default_shipment_address);
      this.total_GetUSeradress = resSlidersData['Total Result']
      //  this.GetUser= this.GetUSerDOne.Results 
      console.log(this.GetUSeradress.Results);
    });
  }
  save(FName: string, province: string, City: string, Area: string, Mobile: string, Address: string, Shipmentaddress, Shipmentbilladdress) {

    // if ( this.fileName) {
    //this.uploadItemsToActivity();
    // this.Waitcall = true;
    console.log('I am in 1 Component');
    // this.itemUploadService.PostImage(this.filetoup, 'UserPics',localStorage.getItem('UserID') ).subscribe(
    // data => {
    // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
    console.log('Successs')
    this.httpService.Useraddressaddtocart(FName, province, City, Area, Mobile, Address, this.Shipmentaddress, this.Shipmentbilladdress).subscribe((response) => {

      this.get();
    },
      error => {
        console.log(error);
      });



    // );

  }

  TrashcartElement(Abc: any) {

    if (isPlatformBrowser(this.platformId)) {
// alert(Abc)
      // for (const tmp of this.CartedProduct.Results) {
      //   if (tmp.id === Abc) {
          // console.log(tmp.id);
          this.GetAdd.DeleteTodoList(Abc).subscribe(data => {
            // alert(tmp.product.id)
            this.total = this.CartedProduct['Total Result']
            // this._shareData.watchtotal(this.total);
            this._shareData.watchtotal(this.total);
            // alert(this._shareData.watchtotal(this.total))
            // this._shareData.currentMessagetotal.subscribe(message => this.total = message)
            Swal.fire('Your offer has been Deleted.', '', 'success');
            this.GetAdd.GetAllProductcart().subscribe(resSlidersData => {

              this.CartedProduct = resSlidersData;
              this.total = this.CartedProduct['Total Result']
              this._shareData.watchtotal(this.total);
              // alert(this._shareData.watchtotal(this.total))

              this._shareData.currentMessagetotal.subscribe(message => this.total = message)
              console.log(this.CartedProduct.Results, 'cart')
            });

          });
          //  this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), 1 );
          //localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
        // }
      // }
    }
  }

  Applycoupon(abc: string) {

    if (this.CartedProduct['products']) {
      console.log(this.CartedProduct['products']);
      this.httpServiceads.GetOnecouponsByID(this.CartedProduct['products'][0]['StoreName'], abc).subscribe(resSlidersData => {
        this.GetUSallerCoupon = resSlidersData;

        const auctiondays = +this.GetUSallerCoupon[0]['Day'] * 86400000;
        const time0 = new Date(); //86400000
        const time1 = new Date(this.GetUSallerCoupon[0].CreatedDate);
        const time3 = ((time1.getTime() - time0.getTime()) + auctiondays);
        // alert(time3.getDay() + '-' + time3.getMinutes() + '-' + time3.getSeconds());
        let x = time3 / 1000;
        this.seconds = Math.floor(x % 60);
        x /= 60;
        this.minutes = Math.floor(x % 60);
        x /= 60;
        this.hours = Math.floor(x % 24);
        x /= 24;
        this.days = Math.floor(x);

        if (this.days > 0) {


          const pid = this.GetUSallerCoupon[0]['ProductID'];

          if (pid === '') {


            const Discountperc = +this.GetUSallerCoupon[0]['Discount'];
            // alert(Discountperc)
            // alert(this.Total)

            const disamount = this.Total * Discountperc;
            // alert(disamount);
            this.TotalDiscount = disamount / 100;

            // alert(disamount1)
            this.Total = this.Total - this.TotalDiscount;


          } else {
            const Discountperc = +this.GetUSallerCoupon[0]['Discount'];


            for (const abc of this.CartedProduct['products']) {

              if (abc.ProductID === pid) {
                const disamount = abc.FixedPrice * Discountperc;
                this.TotalDiscount = disamount / 100;

                // alert(disamount1)
                abc.FixedPrice = abc.FixedPrice - this.TotalDiscount;

              }


            }



          }

        }



      });
    }

  }



  ContinuetoCHeckout(qty) {

    if (isPlatformBrowser(this.platformId)) {
       
      this.orderreview = false;
      if (this.Total > 0) {

       // this.Profile.verify_tokenWithNoRedirict().subscribe((response) => {

         // if (response) {

            this.LoggedIn = true;
            this.LoginName = localStorage.getItem('UserName');
            this.PaymentMethod = true;
            this.BillingMethod = true;
            this.user = localStorage.getItem('UserID');
            this.LoginName = localStorage.getItem('UserName');
            this.httpService.GetUSerdetailsByUserId1().subscribe(resSlidersData => {
              this.GetUSeradress = resSlidersData;
              // this.GetUser= this.GetUSerDOne.Results
              // this.GetUser= this.GetUSerDOne.Results;
              // alert(this.GetUSerDOne.Results)

              if (this.GetUSeradress['Complete'] === false) {
                this._nav.navigate(['/user-detail'], { queryParams: { Inc: 'true' } });
              }

            });
            // for(const checkout of this.CartedProduct.Results){
            //   this.list.push(checkout.product.ProductID,checkout.Quantity,checkout.product.User_ID)
            //  }

            for(const checkout of this.CartedProduct.Results){
              // {"ProductID": "123","UserID":"338","Qty":"1","sellerid":"hassan"}
              this.subtotal=checkout.product.FixedPrice * checkout.Quantity
              alert(checkout.Quantity)
              this.list.push({
                "ProductID":checkout.product.ProductID,          
                "sellerid":checkout.product.User_ID,
                "Qty":checkout.Quantity,
                "proprice": this.subtotal
            
              })
              console.log(this.list,'fatimaaaaaaaaaa')
            //  this.list.push(checkout.product.ProductID,checkout.Quantity,checkout.product.User_ID)
            }
            

            this.httpbuyerService.proceesedtocheckout(this.Total,this.list, this.viewidofshippmentaddress).subscribe(
              data => {
               this.Getinvoiceamount= data.InvoiceID;
               localStorage.setItem("totalprice",this.Total.toString());
               localStorage.setItem("InvoiceID",data.InvoiceID);
               this._nav.navigate(['/payment']);
              
               console.log(this.Getinvoiceamount)
            // this.OrderInvoiceid= this.Getinvoiceamount.InvoiceID;
                
              //  alert("order done place ho gya hi  ")
                  
                // this.OrderPlaced = true;
                // Swal.fire('order done place ho gya hi', '', 'success');
  
                // this.InvoiceIDSet = localStorage.getItem('InvoiceID');
  
   
  
                 
  
  
              } 
            );

        

      } else {
        alert('No sufficient Amount');
      }

    }
    // }
  }

  GuestShippingDetails() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.model);
      console.log('id value is:', localStorage.getItem('UserID'));
      this.httpbuyerService.Invoice( this.Total, false, true, 'Guest').subscribe(
        data => {
          // console.log( this.CartedProduct['products']);
          for (const item of this.CartedProduct['products']) {
            this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty, 'Guest',item.User_ID).subscribe(
              data => {

              }, (err) => {

                alert(err);
                this.status = 2;
                /* this function is executed when there's an ERROR */
                //   console.log("ERROR: "+err);
              },
            );
          }
          this.httpbuyerService.CustomerInvoiceShippingAddress(localStorage.getItem('InvoiceID'),this.GetUSeradress.id ).subscribe(
            data => {

              this.GuestOrderPlaced = true;

              this.InvoiceIDSet = localStorage.getItem('InvoiceID');



              for (const itm of this.CartedProduct['products']) {

                if (itm.Cat_Name === 'Phones & Tablets') {

                  this.httpbuyerService.PhoneAndTabletQuantity(itm.ProductID, itm.itemsqty).subscribe();

                } else if (itm.Cat_Name === 'Women\'s Fashion') {

                  this.httpbuyerService.WomenFashionQuantity(itm.ProductID, itm.itemsqty).subscribe();

                } else if (itm.Cat_Name === 'Men\'s Fashion') {

                  this.httpbuyerService.MenFashionQuantity(itm.ProductID, itm.itemsqty).subscribe();

                } else if (itm.Cat_Name === 'TV, Audio & Video') {

                  this.httpbuyerService.TVAudioVideoQuantity(itm.ProductID, itm.itemsqty).subscribe();

                } else if (itm.Cat_Name === 'Computing & Laptops') {

                  this.httpbuyerService.ComputingLaptopsQuantity(itm.ProductID, itm.itemsqty).subscribe();

                } else if (itm.Cat_Name === 'Home Appliances') {

                  this.httpbuyerService.HomeAppliancesQuantity(itm.ProductID, itm.itemsqty).subscribe();
                }
              }



            }, (err) => {

              alert(err);
              this.status = 2;
              /* this function is executed when there's an ERROR */
              //   console.log("ERROR: "+err);
            },
          );


        }, (err) => {

          alert('false');
          this.status = 2;
          /* this function is executed when there's an ERROR */
          //   console.log("ERROR: "+err);
        },
      );

      // for (const tmp of this.CartedProduct['products']) {
      //     console.log(tmp);
      //     this.CartedProduct['products'].splice(this.CartedProduct['products'].indexOf(tmp), this.CartedProduct['products'].length );
      //     localStorage.setItem('Cartdata', JSON.stringify(this.CartedProduct));
      // }
      localStorage.removeItem('Cartdata');

    }
  }
  expiry_month;
  expiry_year;
  paymenttype;
  price;
  currency_code;
  card_type;
  exp;
  shipmentid;
  // EditProduct() {

  //   this.exp = this.model.expiry_month + this.model.expiry_year;
  //   this.paymenttype = "online";
  //   this.card_type = "visa";
  //   this.currency_code = "USD"
  //   this.price = this.Total;
  //   // this.shipmentid = "24"

  //   this.httpbuyerService.paymentmethod(this.model.creditno, this.exp, this.model.ccv, this.paymenttype, this.price, this.currency_code, this.card_type).subscribe(response => {
  //     Swal.fire('Changes has been Saved', '', 'success');
  //     console.log(this.model.creditno, this.exp, this.model.ccv, this.paymenttype, this.price, this.currency_code, this.card_type)
  //   })



  // }
invoiceproductid;
  ShippingDetails() {

    this.exp = this.model.expiry_month + this.model.expiry_year;
    this.paymenttype = "online";
    this.card_type = "visa";
    this.currency_code = "USD"
    this.price = this.Total;
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.model);
      console.log('id value is:', localStorage.getItem('UserID'));
      // this.httpbuyerService.paymentmethod(this.model.creditno, this.exp, this.model.ccv, 
      //   this.paymenttype, this.price, this.currency_code, this.card_type,this.Getinvoiceamount).subscribe(data => {
          this.httpbuyerService.paymentmethod(this.model.creditno, this.exp, this.model.ccv, 
            ).subscribe(data => {
        // this.httpbuyerService.SendEmail(localStorage.getItem('InvoiceID')).subscribe(data => {
          console.log('cartproduct Successssssssss');
        alert("paymentmethod")
             Swal.fire('Your Order Has Been Placed', '', 'success');
             this.OrderPlaced = true;
      }, (err) => {

        alert('false');
        this.status = 2;
        
      },
    );

    
    localStorage.removeItem('Cartdata');

  }
      // this.httpbuyerService.Invoice(this.Total, true, false, this.user).subscribe(
      //   data => {
 
      //   this.invoiceproductid=data;
        //ye code old hi 
       
//            for (const item of this.CartedProduct.Results) {
// alert(item.product.User_ID)
//             // if (item === this.CartedProduct.Results.length ) {
//               // console.log('item is:  ', item, '  Index is:  ', index);
//               this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.product.ProductID, item.Quantity, localStorage.getItem('UserID'),item.product.User_ID).subscribe(
//                 data => {
//                   alert("InvoiceProducts wai api in loop")
//                   // this.httpbuyerService.paymentmethod(this.model.creditno, this.exp, this.model.ccv, this.paymenttype, this.price, this.currency_code, this.card_type).subscribe(data => {

//                   // // this.httpbuyerService.SendEmail(localStorage.getItem('InvoiceID')).subscribe(data => {
//                   //   console.log('cartproduct Successssssssss');
//                   // });
//                 }, (err) => {

//                   alert(err);
//                   this.status = 2;
//                   /* this function is executed when there's an ERROR */
//                   //   console.log("ERROR: "+err);
//                 },
//               );
//             // } 
//             // else {
//             //   // console.log('item is:  ', item, '  Index is:  ', index);
//             //   this.httpbuyerService.InvoiceProducts(localStorage.getItem('InvoiceID'), item.ProductID, item.itemsqty, localStorage.getItem('UserID')).subscribe(
//             //     data => {

//             //     }, (err) => {

//             //       alert(err);
//             //       this.status = 2;
//             //       /* this function is executed when there's an ERROR */
//             //       //   console.log("ERROR: "+err); 
//             //     },
//             //   );
//             // }
//           }
          // this.httpbuyerService.CustomerInvoiceShippingAddress(localStorage.getItem('InvoiceID'),"31" ).subscribe(
          //   data => {

             
          //       alert("customer")
          //     this.OrderPlaced = true;
          //     Swal.fire('Your Order Has Been Placed', '', 'success');

          //     this.InvoiceIDSet = localStorage.getItem('InvoiceID');
          //     this.httpbuyerService.Paymentemail(localStorage.getItem('InvoiceID'),localStorage.getItem('userss') ).subscribe(
          //       data => {
    
          //        alert("paymentmail wali api ")
                    
          //         // this.OrderPlaced = true;
          //         // Swal.fire('Your Order Has Been Placed', '', 'success');
    
          //         // this.InvoiceIDSet = localStorage.getItem('InvoiceID');
    
     
    
                   
    
    
          //       } 
          //     );
 

               


          //   }, (err) => {

          //     alert(err);
          //     this.status = 2;
          //     /* this function is executed when there's an ERROR */
          //     //   console.log("ERROR: "+err);
          //   },
          // );
         
          
        // });


      
  }

  LoginUser() {

    this._nav.navigate(['/login'], { queryParams: { checkout: 'yes' } });

    // this.LoginName = this.model.username;
    //
    // this.httpService.loged_No_redirect(this.mymodel.username, this.mymodel.Loginpassword).subscribe(
    //   data => {
    //     const User = (localStorage.getItem('UserID')) || 0;
    //     if (User ) {
    //
    //       this.LoggedIn = true;
    //       this.PaymentMethod = true;
    //       this.BillingMethod = true;
    //       this.user = localStorage.getItem('UserID');
    //       this.httpService.GetUSerdetailsByUserId().subscribe(resSlidersData => {
    //         this.GetUSerDOne = resSlidersData;
    //
    //       });
    //
    //     } else {
    //       this.LoggedIn = false;
    //
    //
    //     }
    //
    //   }, (err) => {
    //
    //     this.status = 2;
    //     alert('wrong');
    //     /* this function is executed when there's an ERROR */
    //     //   console.log("ERROR: "+err);
    //   },
    // );

  }

  GuestCheck() {
    this.GuestBillingMethod = true;
  }

  RegisterOrGuest(Guest: boolean, Register: boolean) {

    if (Guest === false && Register === false) {
      alert('Please select an option first');
    } else {
      if (Guest === true) {

        this.GuestButton = true;
        // this.GuestBillingMethod =  true;
      } else {
        this._nav.navigate(['/sign-up']);

      }
    }

  }

  BillingInfo() {
    this.PaymentMethod = true;
    this.BillingMethodButton = false;
  }

  Paymentdisplay(Home: boolean, Online: boolean) {


    if (Home === false) {
      this.PaymentatHme = false;

    } else {
      this.PaymentatHme = true;

    }
  }



}
