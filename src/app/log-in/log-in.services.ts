import 'rxjs/add/operator/map';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
 
import { HttpService } from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { StaticInjector } from '@angular/core/src/di/injector';




@Injectable()

export class LoginService {

 
  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  decoded: string;
  USerNameID: string;
  // http://192.168.30.225:7000
  // https://apis.dhaar.pk
  // ServerUrl = 'https://apis.dhaar.pk/user/';
  // http://192.168.30.187:8000
  ServerUrl = 'https://apis.dhaar.pk/user/';
  
   productsUrl = 'https://apis.dhaar.pk/products/';
  StoreServerUrl = 'https://apis.dhaar.pk/store/';
  EMailServerUrl = 'https://apis.dhaar.pk/rest-auth/';
users;
getusers;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private _http: HttpService,
    private http: Http,
    private _nav: Router) {

  }


  loged_in(mail: any, pass: any, CatName: any, ProID: any, checkout: any) {

    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'user_login/', { 'user': mail, 'pass': pass })
        .map((res: Response) => {
          if (res) {

            if (res.status === 200) {
              
              this.decoded = res.json().Key;
            console.log(this.decoded,"decode")

        
              // localStorage.setItem('UserID',this.decoded );
              localStorage.setItem('Authorization',this.decoded);
              this.GetUSerdetailsByUserId().subscribe(resSlidersData => {
                // alert(resSlidersData['ISConfirmed'])
               
                this.users= resSlidersData;
                localStorage.setItem('UserID',this.users.user );
                console.log(this.users.user)
                this.getusers= this.users.user;
                console.log(this.users)
                // alert(this.getusers)
                localStorage.setItem('userss',this.getusers)
                
                // localStorage.setitem('users',this.users.user)
                // alert(this.users.user)
                if (resSlidersData['ISConfirmed'] === true) {
                //  alert(localStorage.setItem('Authorization', this.decoded))
                  localStorage.setItem('Authorization', this.decoded);
                  localStorage.setItem('password', null);
                  localStorage.setItem('Username', null);
                  localStorage.setItem('UserName', mail);
                 

                  if (CatName !== null && ProID !== null) {

                    this._nav.navigate(['/single-product'], { queryParams: { CatName: CatName, ProID: ProID, Redirect: 'MakeOffer' } });
                  } else if (checkout === 'yes') {
                    if (resSlidersData['Complete'] === true) {
                      this._nav.navigate(['/checkout2'], { queryParams: { login: 'yes' } });
                    } else {
                      this._nav.navigate(['/user-detail'], { queryParams: { Inc: 'true' } });
                    }
                  } else {
                    // alert(resSlidersData['Vendor']);
                    if (resSlidersData['Vendor'] === true) {
                      localStorage.setItem('Vendor',resSlidersData['Vendor'])
                      this._nav.navigate(['/dashboard']);
                    } else {
                      localStorage.setItem('Vendor',resSlidersData['Vendor'])
                      this._nav.navigate(['/buyer-dashboard']);
                    }
                  }
                } else {

                  this.GetEmailById().subscribe(resSlidersData1 => {
                    localStorage.setItem('Usernamae', mail);
                    localStorage.setItem('email', resSlidersData1['email']);
                    localStorage.setItem('password', pass);
                  });

                  this._nav.navigate(['/VerfiyEmail']);
                }

              });
            }
          }
        }).catch((error: any) => {

          return Observable.throw(new Error(error.status));
        });

    }
  }
  loged_No_redirect(mail: any, pass: any) {
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'user-token-auth/', { 'username': mail, 'password': pass })
        .map((res: Response) => {
          if (res) {
            if (res.status === 200) {
              localStorage.setItem('Authorization', res.json().token);
              localStorage.setItem('UserName', mail);
              // this.decoded = this.jwtHelper.decodeToken(res.json().token)['user_id'];
              localStorage.setItem('UserID', this.decoded);

            }
          }
        }).catch((error: any) => {

          return Observable.throw(new Error(error.status));
        });

    }

  }

  GetUSerdetailsByUserId() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'Get_User_details/',{headers:headers} ).map(response => response.json());
 
  }
  GetUSeraddress() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'post_shipment_details/', { headers: headers }).map(response => response.json());
  }
  GetUSeraddressbyID(id: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'put_delete_shipment_details/' + id, { headers: headers }).map(response => response.json());
  }
  // http://192.168.30.225:7000/user/put_delete_shipment_details/
  GetUSerdetailsByUserId1() {

    // return this._http.get(this.ServerUrl + 'Get_User_details/' + decoded).map(response => response.json());
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'post_shipment_details/', { headers: headers }).map(response => response.json());
  }

  GetUSerdetailsByUserIdupdate(id: number, fullname: string, address: string, province: string, city: string, area: string, default_shipment_address: string, phone_no: string, user) {
    // this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    console.log(this.USerNameID)
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.put(this.ServerUrl + 'put_delete_shipment_details/' + id,
      {

        "id": id,
        "fullname": fullname,
        "address": address,
        "province": province,
        "city": city,
        "area": area,
        "default_shipment_address": default_shipment_address,
        "phone_no": phone_no,
        "user_id": user


      }, { headers: headers })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }


  loged_out() {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.setItem('UserID', null);
      localStorage.clear();
      return this._http.post(this.ServerUrl + 'api-token-refresh/', { 'token': localStorage.getItem('Authorization') });
    }
  }

  sendmail(email) {

    if (isPlatformBrowser(this.platformId)) {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this.ServerUrl + 'user_confirm/',
        JSON.stringify({
          user: email,
          username: localStorage.getItem('Usernamae')
        }), { headers: headers })
        .map((response: Response) => {
          Swal.fire({
            title: 'Please check your Inbox for Account Activation Instructions.',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this._nav.navigate(['/VerfiyEmail/a'])
            }
          })
        });
    }
  }

  // post_signup_form(username: string, email: string, password: string, Fname, LName, Mobile) {
post_signup_form(username: string, email: string, password: string, Fname, LName, Mobile,Country,State,City,zip,Address,Pic) {

    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'signupuser/', {
        // 'username' :  username,
        // 'email':  email,
        // 'first_name': Fname,
        // 'last_name': LName,
        // 'password':  password,
        "username": username,
        "email": email,
        "password": password,
        "fname": Fname,
        "lname": LName,
        "mobile": Mobile,
        // "country": null,
        // "state": null,
        // "city": null,
        // "zip": null,
        // "address": null,
        // "vendor": false,
        // "pic": null
        "country": Country,
        "state": State,
        "city": City,
        "zip": zip,
        "address": Address,
        "vendor": false,
        "pic": Pic

      })
        .map((res: Response) => {

          if (res) {
            if (res.status === 201 || res.status === 200) {
              // localStorage.setItem('account_created' , '1' );
              const responce_data = res.json();
              localStorage.setItem('Usernamae', username);
              localStorage.setItem('email', email);
              localStorage.setItem('password', password);
              //  alert(localStorage.getItem('id'));
              console.log('Responce Data is: ', responce_data.id);
              //  console.log('ok submited');
             // this.sendmail(email).subscribe();
              //this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
              this._nav.navigate(['/VerfiyEmail/a']);
            }
          }
        }).catch((error: any) => {

          if (error.status !== 404) {
            if (error.status === 401) {
              console.log(error);

              return Observable.throw(new Error(error.status));
            }


          } else {
            console.log(error);
            //   this._nav.navigate(['/login']);

            return Observable.throw(new Error(error.status));
          }
        });
    }
  }

  register_customer(responce_data, Fname, LName, Mobile) {

    return this._http.post(this.ServerUrl + 'addUserDetails/',
      {
        'user_id': responce_data,
        'Fname': Fname,
        'Lname': LName,
        'Mobile': Mobile,
        'Vendor': false,
        'ISConfirmed': false,
      }).map((res: Response) => {
        if (res) {

          if (res.status === 201 || res.status === 200) {

          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            // console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });

  }

  verify_username(username: string) {

    //console.log(username);
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    return this._http.get(this.ServerUrl + 'verifyusername/' + username, { headers: headers })
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            const response_useradmin = res.json();
            return response_useradmin;
          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            return Observable.throw(new Error(error.status));
          }
        } else {
          console.log(error);
          return Observable.throw(new Error(error.status));
        }
      });
  }

  check_email_unique(email) {
    console.log('sdsdd');

    return this._http.get(this.ServerUrl + 'email_verify/' + email).map((response: Response) => response.json());
  }

  GetStoreInformationByUserId() {
    const headers = new Headers();
  
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.productsUrl + 'all_stores_names/' ,{headers :headers}).map((response: Response) => response.json());
    // http://192.168.30.225:8000/products/all_stores_names/
    //  this.StoreServerUrl 
  }

  verify_token() {
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
        .map((res: Response) => {
          if (res) {

            if (res.status === 201) {
              // return true;

            } else if (res.status === 200) {
              // return true;
            }
          }
        }).catch((error: any) => {
          if (error.status === 404) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 400) {
            console.log('Not');
            this._nav.navigate(['/owner_login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 401) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else {

            this._nav.navigate(['/login']);
          }
        });
    }
  }


  verify_tokenForlogin() {
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
        .map((res: Response) => {
          const token = res.json() && res.json().token;
          if (token) {
            this._nav.navigate(['/home']);
          } else {
            this._nav.navigate(['/login']);
          }
        }).catch((error: any) => {
          if (error.status === 404) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 400) {
            console.log('Not');
            this._nav.navigate(['/owner_login']);
            return Observable.throw(new Error(error.status));
          } else if (error.status === 401) {
            console.log('ok not submited submite');
            this._nav.navigate(['/login']);
            return Observable.throw(new Error(error.status));
          } else {

            this._nav.navigate(['/login']);
          }
        });
    }
  }


  verify_tokenWithNoRedirict() {
    if (isPlatformBrowser(this.platformId)) {

      return this._http.post(this.ServerUrl + 'api-token-verify/', { 'token': localStorage.getItem('Authorization') })
        .map(response => {
          const token = response.json() && response.json().token;
          if (token) {
            return true;
          } else {
            return false;
          }
        }
        )
        .catch(err => Observable.of(false));
    }
  }


  // StoreRegistration(model: any[]) {
  //   if (isPlatformBrowser(this.platformId)) {

  //     console.log(model['fbrunregister']);
  //     if (model['fbrunregister'] === true) {

  //       model['fbrregister'] = false;
  //       model['fbrname'] = '-';
  //       model['cnic'] = '-';
  //       model['strn'] = '-';

  //       console.log(model['fbrregister']);
  //       console.log(model['fbrname']);
  //       console.log(model['cnic']);
  //       console.log(model['strn']);

  //     }
  //     return this._http.post(this.StoreServerUrl + 'GetStoreInformation/' + localStorage.getItem('UserID'),
  //       {
  //         'StoreName': model['storename'],
  //         'OwnerName': model['ownername'],
  //         'BusinessEmail': model['email'],
  //         'Zip': model['zipcode'],
  //         'City': model['city'],
  //         'OwnerContactNum': model['personal'],
  //         'BusinessPhone': model['business'],
  //         'Address': model['address'],
  //         'FbrRegister': model['fbrregister'],
  //         'LegalName': model['fbrname'],
  //         'NTN': model['cnic'],
  //         'STRN': model['strn'],
  //         'UserID': localStorage.getItem('UserID'),

  //       })

  //       .map((res: Response) => {

  //         if (res) {
  //           if (res.status === 201 || res.status === 200) {
  //             // localStorage.setItem('account_created' , '1' );
  //             // const responce_data = res.json();
  //             // localStorage.setItem('Reg', 'Done');
  //             //  alert(localStorage.getItem('id'));

  //             this.StoreBankRegistration(model).subscribe(data => {
  //               console.log(data);
  //             });
  //             // this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
  //           }
  //         }
  //       }).catch((error: any) => {
  //         console.log(error);
  //         if (error.status !== 404) {
  //           if (error.status === 401) {
  //             console.log(error);

  //             return Observable.throw(new Error(error.status));
  //           }


  //         } else {
  //           console.log(error);
  //           //   this._nav.navigate(['/login']);

  //           return Observable.throw(new Error(error.status));
  //         }
  //       });
  //   }
  // }

  StoreRegistration(model: any[]) {
    if (isPlatformBrowser(this.platformId)) {

      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      console.log('pofile', localStorage.getItem('Authorization'));

      console.log(model['fbrunregister']);
      if (model['fbrunregister'] === true) {

        model['fbrregister'] = false;
        model['fbrname'] = '-';
        model['cnic'] = '-';
        model['strn'] = '-';

        console.log(model['fbrregister']);
        console.log(model['fbrname']);
        console.log(model['cnic']);
        console.log(model['strn']);

      }

      return this._http.post(this.StoreServerUrl + 'GetStoreInformation/' ,
        {
          'storename': model['storename'],
          'ownername': model['ownername'],
          'businessemail': model['email'],
          'zip': model['zipcode'],
          'city': model['city'],
          'contactno': model['personal'],
          'businessphone': model['business'],
          'address': model['address'],
          'fbrregister': model['fbrregister'],
          'legalname': model['fbrname'],
          'ntn': model['cnic'],
          'strn': model['strn'],
          // 'UserID': localStorage.getItem('UserID'),
          // 'pic': Pic,
          'acctitle': model['acount_title'],
          'accno': model['acount_number'],
          'bankname': model['Bank_name'],
          'branchname': model['Branch_name'],
          'branchcode': model['Branch_code'],

          //         "storename":"yahoo.com",
// "ownername":"jibran",
// "businessemail":"hasni17@gmail.com",
// "zip":"75003",
// "city":"fsd",
// "contactno":"42333565",
// "businessphone":"6963333",
// "address":"haaaakakak",
// "ntn":"11101010",
// "strn":"7333939",
// "pic":"https://storage.dhaar.pk/UserPics/56/4_9_49.jpg",
// "fbrregister":false,
// "acctitle":"punjab",
// "accno":"558585",
// "bankname":"snskkskks",
// "branchname":"akkakak",
// "branchcode":"7299292",
// "legalname":"aahhaha"

        },{headers: headers})
        .map((res: Response) => {
          console.log('Storing with pic');

          if (res) {
            if (res.status === 201 || res.status === 200) {
              // localStorage.setItem('account_created' , '1' );
              // const responce_data = res.json();
              // localStorage.setItem('Reg', 'Done');
              //  alert(localStorage.getItem('id'));

             // this.StoreBankRegistration(model).subscribe(data => {
               // console.log(data);
              // });
              // this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
            }
          }
        }).catch((error: any) => {
          console.log(error);
          if (error.status !== 404) {
            if (error.status === 401) {
              console.log(error);

              return Observable.throw(new Error(error.status));
            }


          } else {
            console.log(error);
            //   this._nav.navigate(['/login']);

            return Observable.throw(new Error(error.status));
          }
        });
    }
  }


  StoreRegistrationPic(model: any[], Pic: any) {
    if (isPlatformBrowser(this.platformId)) {

      const headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Token ' +  this.authentication);
      headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
      console.log('pofile', localStorage.getItem('Authorization'));

      console.log(model['fbrunregister']);
      if (model['fbrunregister'] === true) {

        model['fbrregister'] = false;
        model['fbrname'] = '-';
        model['cnic'] = '-';
        model['strn'] = '-';

        console.log(model['fbrregister']);
        console.log(model['fbrname']);
        console.log(model['cnic']);
        console.log(model['strn']);

      }

      return this._http.post(this.StoreServerUrl + 'GetStoreInformation/' ,
        {
          'storename': model['storename'],
          'ownername': model['ownername'],
          'businessemail': model['email'],
          'zip': model['zipcode'],
          'city': model['city'],
          'contactno': model['personal'],
          'businessphone': model['business'],
          'address': model['address'],
          'fbrregister': model['fbrregister'],
          'legalname': model['fbrname'],
          'ntn': model['cnic'],
          'strn': model['strn'],
          // 'UserID': localStorage.getItem('UserID'),
          'pic': Pic,
          'acctitle': model['acount_title'],
          'accno': model['acount_number'],
          'bankname': model['Bank_name'],
          'branchname': model['Branch_name'],
          'branchcode': model['Branch_code'],

          //         "storename":"yahoo.com",
// "ownername":"jibran",
// "businessemail":"hasni17@gmail.com",
// "zip":"75003",
// "city":"fsd",
// "contactno":"42333565",
// "businessphone":"6963333",
// "address":"haaaakakak",
// "ntn":"11101010",
// "strn":"7333939",
// "pic":"https://storage.dhaar.pk/UserPics/56/4_9_49.jpg",
// "fbrregister":false,
// "acctitle":"punjab",
// "accno":"558585",
// "bankname":"snskkskks",
// "branchname":"akkakak",
// "branchcode":"7299292",
// "legalname":"aahhaha"

        },{headers: headers})
        .map((res: Response) => {
          console.log('Storing with pic');

          if (res) {
            if (res.status === 201 || res.status === 200) {
              // localStorage.setItem('account_created' , '1' );
              // const responce_data = res.json();
              // localStorage.setItem('Reg', 'Done');
              //  alert(localStorage.getItem('id'));

             // this.StoreBankRegistration(model).subscribe(data => {
               // console.log(data);
              // });
              // this.register_customer(responce_data.id, Fname, LName, Mobile).subscribe();
            }
          }
        }).catch((error: any) => {
          console.log(error);
          if (error.status !== 404) {
            if (error.status === 401) {
              console.log(error);

              return Observable.throw(new Error(error.status));
            }


          } else {
            console.log(error);
            //   this._nav.navigate(['/login']);

            return Observable.throw(new Error(error.status));
          }
        });
    }
  }

  // Vendorshipchange(userid: string) {
  //   return this._http.get(this.ServerUrl + 'Vendorship/' + userid).map(response => response.json());
  // }

  StoreBankRegistration(model: any[]) {
    if (isPlatformBrowser(this.platformId)) {


      return this._http.post(this.StoreServerUrl + 'GetStoreBankInformation/' + localStorage.getItem('UserID'),
        {
          'StoreID': model['storename'],
          'acctitle': model['acount_title'],
          'accno': model['acount_number'],
          'bankname': model['Bank_name'],
          'branchname': model['Branch_name'],
          'branchcode': model['Branch_code'],
        
        })
        .map((res: Response) => {
          if (res) {
            console.log(res);
            if (res.status === 201 || res.status === 200) {
              // const responce_data = res.json();
              localStorage.setItem('StoreReg', 'Done');
              this._nav.navigate(['/login']);
              localStorage.clear();
            }
          }
        }).catch((error: any) => {
          console.log(error);
          if (error.status !== 404) {
            if (error.status === 401) {
              console.log(error);

              return Observable.throw(new Error(error.status));
            }


          } else {
            console.log(error);
            //   this._nav.navigate(['/login']);

            return Observable.throw(new Error(error.status));
          }
        });
    }
  }





  verifyStoreName(username: string) {
    //console.log(username);
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.post(this.StoreServerUrl + 'verifyStoreName&Email/', {

      'store':username
    },{headers:headers})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            const response_useradmin = res.json();
            return response_useradmin;
          }
        }
      }).catch((error: any) => {
        console.log(error);
        if (error.status !== 404) {
          if (error.status === 401) {
            return Observable.throw(new Error(error.status));
          }
        } else {
          console.log(error);
          return Observable.throw(new Error(error.status));
        }
      });
  }

  email_verifyforStore(email) {
    return this._http.get(this.StoreServerUrl + 'emailverifyforStore/' + email).map((response: Response) => response.json());

  }



  GetUserDetailByName(){
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'UserFullDetails/',{headers: headers} ).map((response: Response) => response.json());
  }

  GetEmailById() {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'Get_EmailByID/',{headers :headers}).map((response: Response) => response.json());
  }

  UserDetailsUpdatePic(Username: string, Pic: any) {
    return this._http.post(this.ServerUrl + 'UserFullDetailsPicUpload/' + Username,
      {
        'Pic': Pic,
      })
      .map((res: Response) => {
        console.log('Response:', res);
      });
  }
  Useraddressaddtocart(FName: string, Address: string, province: string, City: string, Area: string, Shipmentaddress,Shipmentbilladdress,Mobile) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.post(this.ServerUrl + 'post_shipment_details/',
      {
       
        'fullname': FName,
        'address': Address,
        'province': province,
        'city': City,
        'area': Area,
        'default_shipment_address': Shipmentaddress,
        'default_bill_address':Shipmentbilladdress,
        'phone_no': Mobile
        // FName,address,province,city,area,Shipmentaddress,Shipmentbilladdress,mobile
                // {
        //   "fullname":"hassan",
        //   "address":"2nd adrresss",
        //   "province":"punjab",
        //   "city":"fsd",
        //   "area":"samanabad",
        //   "default_shipment_address":false,
        //   "default_bill_address":true,
        //   "phone_no":"89128963447"
        //   }


      }, { headers: headers })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
            return responce_data;
          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  sellerstoreinformationupdate(id,SName:string,OName:string,Email:string,zip:string,City:string,ownercontactnum:string,Businessphone:string,Address:string,fbrregister:string,Legalname:string,ntn:string,strn:string,atitle:string,accountnum:string,banknam:string,branchnam:string,branchcod:string,pic) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.put(this.StoreServerUrl + 'GetStoreInformation/' ,
      {
        // "id": 105,
        // "storename":"http://bismillah.net",
        // "ownername":"oksksss",
        // "businessemail":"muhammad.hasan@brainplow.com",
        // "zip":"75003",
        // "city":"fsd",
        // "contactno":"42333565",
        // "businessphone":"6963333",
        // "address":"haaaakakak",
        // "ntn":"11101010",
        // "strn":"7333939",
        // "pic":"https://storage.dhaar.pk/UserPics/56/4_9_49.jpg",
        // "fbrregister":false,
        // "acctitle":"punjab",
        // "accno":"558585",
        // "bankname":"snskkskks",
        // "branchname":"akkakak",
        // "branchcode":"7299292",
        // "legalname":"aahhaha"
        
        'id':id,
        'storename': SName,
        'ownername':OName,
        'businessemail':Email,
        'zip':zip,
        'city':City,
        'contactno':ownercontactnum,
        'businessphone':Businessphone,
        'address':Address,
        'ntn':ntn,
        'strn':strn,
        'pic':pic,
        'fbrregister':fbrregister,
        'acctitle':atitle,
        'accno':accountnum,
        'bankname':banknam,
        'branchname':branchnam,
        'branchcode':branchcod,
        'legalname':Legalname
        
         


      }, { headers: headers })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }


  UserDetailsUpdate(id: number, FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Vendor: string, Pic: any, Username: string, ISConfirmed: string, Complete: string) {
    // this.USerNameID = this.jwtHelper.decodeToken(localStorage.getItem('Authorization'))['user_id'];
    // console.log(this.USerNameID)
    // Get_User_details
    // UserFullDetails
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this.http.put(this.ServerUrl + 'Get_User_details/' ,
      {
        "id": id,
        // "user_id": 277,
        'user_id': Username,
        'Fname': FName,
        'Lname': Lname,
        'Mobile': Mobile,
        'Country': Country,
        'State': State,
        'City': City,
        'Zip': Zip,
        'Address': Address,
        'Vendor': Vendor,
        'ISConfirmed': ISConfirmed,
        'Pic': Pic,
        'Complete': Complete


      },{headers:headers})
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            // const responce_data = res.json();
            const responce_data = res.json();
          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  UserDetailsUpdateWithOutPic(FName: string, Lname: string, Country: string, State: string, City: string, Zip: string, Mobile: string, Address: string, Username: string) {
    return this._http.post(this.ServerUrl + 'UserFullDetailsWithoutPic/' + Username,
      {
        'user_id': Username,
        'Fname': FName,
        'Lname': Lname,
        'Mobile': Mobile,
        'Country': Country,
        'State': State,
        'City': City,
        'Zip': Zip,
        'Address': Address,


      })
      .map((res: Response) => {

        if (res) {
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
          }
        }
      }).catch((error: any) => {

        if (error.status !== 404) {
          if (error.status === 401) {
            console.log(error);

            return Observable.throw(new Error(error.status));
          }


        } else {
          console.log(error);
          //   this._nav.navigate(['/login']);

          return Observable.throw(new Error(error.status));
        }
      });
  }

  changepass(username: string, currPass: string, pass1: string, pass2: string) {

    return this._http.post(this.ServerUrl + 'ChangePassword', {
      'email': username,
      'current': currPass,
      'pass1': pass1,
      'pass2': pass2
    }).map((response: Response) => response.json());
  }

  UserConfirm(key: any) {
    return this._http.post(this.ServerUrl + 'activate_account/', {
      'activation_key': key,
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          console.log('Yahoooooo Status MAtch');
        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });
  }


  reset_service(email) {
    console.log(email);
    return this._http.post(this.ServerUrl + 'forget_password_customer/', {
      'user': email
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          console.log('Yahoooooo Status MAtch');
        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });
  }


  ResetPasswordConfirm(uid, token, pass1, pass2) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.ServerUrl + 'passowrd_reset_confirm/', {
      'activation_key': token,
      'password': pass2,
      'uid': uid
    }).map((res: Response) => {

      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          // const responce_data = res.json();
          console.log('Yahoooooo Status MAtch');
        }
      }
    }).catch((error: any) => {

      if (error.status !== 404) {
        if (error.status === 401) {
          console.log(error);

          return Observable.throw(new Error(error.status));
        }


      } else {
        console.log(error);
        //   this._nav.navigate(['/login']);

        return Observable.throw(new Error(error.status));
      }
    });

  }

  checkcode(key, email) {
    if (isPlatformBrowser(this.platformId)) {

      console.log(key);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this.ServerUrl + 'verify/email/',
        JSON.stringify({
          email: email,
          username: localStorage.getItem('Usernamae'),
          key: key
        }), { headers: headers })
        .map((response: Response) => {

          if (response) {

          }

        }).catch((error: any) => {

          if (error.status !== 404) {
            if (error.status === 401) {
              console.log(error);

              return Observable.throw(new Error(error.status));
            }


          } else {
            console.log(error);
            //   this._nav.navigate(['/login']);

            return Observable.throw(new Error(error.status));
          }
        });
    }
  }


  NewsLatterEmail(email) {

    return this._http.post(this.ServerUrl + 'subscription', {
      'Email': email
    }).map((response: Response) => response.json());
  }


}
