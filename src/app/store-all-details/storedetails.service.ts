// import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import Swal from "sweetalert2";

@Injectable()
export class StoredetailsService {

  private id: any;
  private head: any;
  public login: any;
  returnUrl: string;
  // https://apis.dhaar.pk/store/
  // http://192.168.30.225:7000
  ServerUrl =  'https://apis.dhaar.pk/store/';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpService ,
              private http: Http,
              private _nav: Router) {
  }

  GetAllStoreByStorenames() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token ' +  this.authentication);
    headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
    console.log('pofile', localStorage.getItem('Authorization'));
    return this._http.get(this.ServerUrl + 'GetStoreInformation/',{headers :headers}).map(response => response.json());
  }
}
