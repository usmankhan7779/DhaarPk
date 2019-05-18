// import {Observable} from "rxjs";
// import {Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
// import {Observable} from "rxjs";
import {Observable} from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UploadItemService {

  ServerUrl = 'http://192.168.29.132:8000/products/';

  constructor(private _http : HttpClient) {

  }

  PostImage(fileToUpload: FileList,StoreName, ProductID): Observable<boolean> {
    console.log('I am in 1 Service');
    const formData: FormData = new FormData();
    console.log('File to upload in service is:', fileToUpload);
    for(let i=0; i<fileToUpload.length;i++) {
      formData.append('input_file' +[i], fileToUpload[i]);
    }
    formData.append('ProductID', ProductID);
    formData.append('StoreName', StoreName);

    console.log('formData is:', formData);

    return this._http.post(this.ServerUrl+'onePicUpload', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }


  PostImageCheck(fileToUpload: FileList,StoreName, ProductID): Observable<boolean> {
    console.log('I am in 1 Service');
    const formData: FormData = new FormData();
    console.log('File to upload in service is:', fileToUpload);
    for(let i=0; i<fileToUpload.length;i++) {
      formData.append('input_file' +[i], fileToUpload[i]);
    }
    formData.append('ProductID', ProductID);
    formData.append('StoreName', StoreName);

    console.log('formData is:', formData);

    return this._http.post(this.ServerUrl+'onePicUpload', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }

}
