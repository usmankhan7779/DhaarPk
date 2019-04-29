import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ContactUsServices} from './contact-us.services';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers : [ContactUsServices]
})
export class ContactUsComponent implements OnInit {

  model: any = {};
  Waitcall = false;
  captcha = false;

  constructor(private obj: ContactUsServices,
              private _nav: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
  resolved(event){
    this.captcha = true;
  }


  contact_log(name,email,phone,message) {
    console.log('dfdcusdbjhaaaaaaaaaaaaaaaaaaaaaaaaa');
    this.obj.contact_us(name, email, phone,message).subscribe(data => {
      const selectElement = <HTMLSelectElement>document.getElementById('contact_form');
      // selectElement.reset();
      Swal.fire('Your Message has been Submitted','','success');
    });
  }

}
