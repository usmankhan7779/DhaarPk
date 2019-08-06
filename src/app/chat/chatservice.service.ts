import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
serverUrl="https://apis.dhaar.pk/"
  constructor(private _http: Http,
    private _nav: Router) { }
getUserForChat()
{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', 'Token ' +  this.authentication);
  headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
  //// console.log('pofile', localStorage.getItem('Authorization'));
  return this._http.get( this.serverUrl + 'chat/chathistory/',{headers : headers} ).map(response => response.json());
}
getChatsofUsers(id)
{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', 'Token ' +  this.authentication);
  headers.append('Authorization', 'Token ' +localStorage.getItem('Authorization'));
  //// console.log('pofile', localStorage.getItem('Authorization'));
  return this._http.get( this.serverUrl + 'chat/messages/'+id,{headers : headers} ).map(response => response.json());
}
}
