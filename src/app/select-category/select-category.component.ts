import { Component, OnInit } from '@angular/core';
import { AdService } from '../post-ad/ad.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  GetallCat: any = [];
  user = false;
  seller = true;
  users =false;
  sellers =false;
  // ServrUrl: string = 'assets/images/';
  ServrUrl: string  = 'https://storage.dhaar.pk/final/';
  constructor(
    private PostAdd: AdService,private router: Router,
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('StoreName'));
    console.log(localStorage.getItem('UserID'));

    if(localStorage.getItem('Vendor') == 'true'|| localStorage.getItem('Vendor') == 'false') {
      this.user = true;
      // alert(this.user)
    } else if (localStorage.getItem('UserID') && localStorage.getItem('StoreName') === null){
      this.seller = false;
      // alert(this.seller)
    }
    this.routetopostad();

    this.PostAdd.GetAllCategories().subscribe(resSlidersData => this.GetallCat = resSlidersData);


  }
  routetopostad(){
    if (localStorage.getItem('Vendor') == 'true'){
      // this.router.navigate(['/post-ad']);

    this.sellers = true;
    }
      else if (localStorage.getItem('Vendor') == 'false'){
        // this.router.navigate(['/post-ads']);
        this.users = true

      }
  }
  // dashboardmove(){
  //   if(localStorage.getItem('role') == "Not Deregulatedstate Vendor"){
  //       this.router.navigate(['/vendordashboard']);}
  //       else if(localStorage.getItem('role') == "Deregulatedstate Vendor"){
  //           this.router.navigate(['/vendordashboards']);
  //       }
  // }

}
