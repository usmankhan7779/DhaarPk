

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from '../services/http-service';
@Injectable()
export class AuthGuard implements CanActivate {
  ServerUrl =  'https://apis.dhaar.pk/user/';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpService ,
              private router: Router) { }

  // verify_tokenWithNoRedirict() {
  //   if (isPlatformBrowser(this.platformId)){
  //   return this._http.post(this.ServerUrl + 'api-token-verify/', {'token': localStorage.getItem('Authorization')})
  //     .map(response => {
  //         const token = response.json() && response.json().token;
  //         if (token) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //   }
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
    if (localStorage.getItem('Authorization')) {
      // logged in so return true
      return true;
    }

    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
