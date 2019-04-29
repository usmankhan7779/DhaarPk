import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http-service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactUsServices {

  ServerUrl = 'https://apis.dhaar.pk/user/';

  constructor(private _http: HttpService,
              private _nav: Router) {
  }

  contact_us(name: any, mail: any, mobile: any, message: any, ) {

    return this._http.post(this.ServerUrl + 'Contact-Us/', {'Name': name, 'Email': mail, 'Phone': mobile, 'Message': message}).map(response => response.json());
  }
}
