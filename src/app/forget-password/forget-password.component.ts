import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../log-in/log-in.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  isSend = false;
  isError = false;
  Waitcall = false;
  constructor(private obj: LoginService,
              private _nav: Router) { }

  ngOnInit() {
  }

  SendEmail(id: any) {
    this.Waitcall = true;
    this.isSend = false;
    this.Waitcall = false;
    this.obj.reset_service(id)
      .subscribe(
        data => {

      //     return Response({'message':'Reset Password mail send Successfully'},status.HTTP_200_OK)
      //     else:
      //         return Response({'message':'User Not verify'},status.HTTP_200_OK)
      // else:
      //     return Response({'message': 'Email Not Exist'}, status.HTTP_200_OK)
          // message: "User Not verify"
          if (data.message == "Reset Password mail send Successfully"){
          Swal.fire({
            title: 'Please check your Inbox for Account Activation Instructions.',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this._nav.navigate(['/'])
            }
          })
        
          console.log(data);
          this.Waitcall = false;
          this.isSend = true;
        }
        else if (data.message == "User Not verify"){
          Swal.fire({
            title: 'User Not Verfiy',
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            // if (result.value) {
            //   this._nav.navigate(['/'])
            // }
          })
        
          // console.log(data);
          // this.Waitcall = false;
          // this.isSend = true;
        }
        else if (data.message == "Email Not Exist"){
          Swal.fire({
            title: 'Your Email Does Not Exist',
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            // if (result.value) {
            //   this._nav.navigate(['/'])
            // }
          })
        
          // console.log(data);
          // this.Waitcall = false;
          // this.isSend = true;
        }
        },
        error => {
          this.Waitcall = false;
          this.isSend = false;
          this.isError = true;
          console.log(error);
        });
  }



}
