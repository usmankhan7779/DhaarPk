import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActiveAdServices} from '../active-ad/active-ad.services';
import {Router, ActivatedRoute} from '@angular/router';
import {AdService} from '../post-ad/ad.services';
import Swal from 'sweetalert2';
import { UploadItemService } from '../file-uploads/upload-item-service';

@Component({
  selector: 'app-seller-product-setting',
  templateUrl: './seller-product-setting.component.html',
  styleUrls: ['./seller-product-setting.component.scss']
})
export class SellerProductSettingComponent implements OnInit {

  Allproducts:any=[];
  ActiveProduct: any = [];
  DeactiveProducts :any =[];
  GetallCat: any = [];
  GetAllSubCat: any = [];
  GetAllSubSubCat: any = [];
  model: any ={};
  r: any;
  pageno: any;
  SessionstoreName: any;
  CatId: any;
  ReservePrice = false;
  ManCatID: any;
  SubCatID: any;
  currentindex: any;
  sub: any;
  product_ad_active ="False";
  Active="True"
  filetoup:any=[];
  url: any=[];
  PicCounter: any =0;
  filetoup1:any=[];
  PictureCheck = false;
  MaxPictureCheck = false;
  ShowPictureError = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _nav:Router,
              // private route: ActivatedRoute,
              private itemUploadService: UploadItemService,
              private ad:ActiveAdServices,
              private PostAdd: AdService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
    // this.sub = this.route.params.subscribe(params => {
    // this.SessionstoreName = params['storename'];
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.SessionstoreName = params['storename'] || '0';
     
      // alert(this.SessionstoreName)
      // this.SessionstoreName = localStorage.getItem('StoreName');
      if(this.SessionstoreName) {
        // getAll_ProductBYStoreName
        // getactivedeacvtiveproductbystorename
        // getdeacvtiveproductbystorename
        this.ad.getAll_ProductBYStoreName(this.SessionstoreName).subscribe(data => {
          this.Allproducts = data;
          console.log('Active Products are:::', this.ActiveProduct);
        });
        this.ad.getactiveproductbystorename(1,this.SessionstoreName).subscribe(data => {
          this.ActiveProduct = data;
          console.log('Active Products are:::', this.ActiveProduct);
        });
        this.ad.getdeacvtiveproductbystorename(1,this.SessionstoreName).subscribe(data => {
          this.DeactiveProducts = data;
          console.log('DeActive Products are:::', this.DeactiveProducts);
        });

      } else {
        this._nav.navigate(['/']);
      }
   
      this.PostAdd.GetAllCategories().subscribe(resSlidersData => {
        this.GetallCat = resSlidersData
      });
    });
    
    }
    // alert(this.Active)
    
  }
  // pageTrendChanged(event) {
  //   if (isPlatformBrowser(this.platformId)){
  //     this.r = event;
  //     this.pageno = event;

  //     alert(this.pageno);
  //     this.ad.getAll_ProductBYStoreName(this.pageno, this.SessionstoreName).subscribe(
  //       data => {
  //         this.ActiveProduct = data;
  //       });
  //   }
  // }

  SaveProduct(product, index) {
    this.currentindex = index;
    this.model = product;
    for(const itm of this.GetallCat) {
      if(itm.Cat_Name === this.model.Cat_Name) {
        this.CatId = itm.id;
          console.log(itm.Sub_Sub_Cat_Name_id)
        console.log('ID is:', this.CatId);
      }
    }
    // alert(itm.Sub_Sub_Cat_Name_id)

    this.PostAdd.GetAllSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => {
      this.GetAllSubCat = resSlidersData
    });

    this.PostAdd.GetAllSubSubCategoriesByCatID(this.CatId).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
    console.log('Attributes are:', this.model);
    console.log('Index are:', index);
  }   

  removepic(image:File) {
    console.log('image isss:', image);
    this.filetoup.splice(image,1);
    this.url.splice(image,1);
    this.PicCounter -=1;
    console.log('filetoup after remove:', this.filetoup);
  }
  
  onChange(event:FileList) {

    this.PicCounter +=event.length;

    console.log('PicCounter is', this.PicCounter);

    if (event.length <=5 && this.PicCounter <= 5) {
      this.PictureCheck = true;
      console.log('Event', event);
      for (let i = 0; i < event.length; i++) {
        if (event) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            console.log('Inner event', event);
            this.url.push(event.target.result);
          };
          reader.readAsDataURL(event[i]);
        }
      }
      this.filetoup1 = event;
      for (let itm of this.filetoup1) {
        this.filetoup.push(itm);
      }
      console.log('Filetoup has:', this.filetoup);
    } else {
      Swal.fire('Maximum 5 Pictures are allow','','error');
      this.PicCounter -= event.length;
    }

    console.log('PicCounter at end is', this.PicCounter);

  }

  uploadItemsToActivity(StoreName,ProductID) {
    // if (this.filetoup.length === 1) {
    console.log('I am in 1 Component');
    this.itemUploadService.PostImage(this.filetoup, StoreName, ProductID).subscribe(
      data => {
        console.log('Successs')
      },
      error => {
        console.log(error);
      });
  }

  checked3(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.product_ad_active = "True";
        console.log(this.product_ad_active,'true fbr register')
        alert(this.product_ad_active)
        //this.setPage(1);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.product_ad_active="False";
        console.log(this.product_ad_active,'false fbr register')
        alert(this.product_ad_active)
        //this.setPage(1);
    }
    //console.log(this.months3)
  }
  checked4(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.Active = "False";
        
        console.log(this.Active,'true fbr register')
        alert(this.Active)
        //this.setPage(1);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.Active="True";
        console.log(this.Active,'false fbr register')
        alert(this.Active)
        //this.setPage(1);
    }
    //console.log(this.months3)
  }
  EditProduct() {
    this.model.MaxQuantity = this.model.Quantity;
    console.log('Final Attributes are:', this.model);

    this.PostAdd.Edit_PhoneAndTabletProduct_Product(this.model).subscribe(response => {
      Swal.fire('Changes has been Saved','','success');
    })
    this.ad.getactiveproductbystorename(1,this.SessionstoreName).subscribe(data => {
      this.ActiveProduct = data;
      console.log('Active Products are:::', this.ActiveProduct);
    });
    this.ad.getdeacvtiveproductbystorename(1,this.SessionstoreName).subscribe(data => {
      this.DeactiveProducts = data;
      console.log('DeActive Products are:::', this.DeactiveProducts);
    });

  }

  MainCatSel(id) {
    console.log('Cat ID issssssssss:', id);
    for(const itm of this.GetallCat) {
      if(itm.Cat_Name_id === id) {
        this.ManCatID = itm.id;
      }
    }
    this.PostAdd.GetAllSubCategoriesByCatID(this.ManCatID).subscribe(resSlidersData => {
      this.GetAllSubCat = resSlidersData;
      this.model.Sub_Cat_Name = this.GetAllSubCat[0].Sub_Cat_Name;
      for(const itm1 of this.GetAllSubCat) {
        if(itm1.Sub_Cat_Name === this.model.Sub_Cat_Name) {
          this.SubCatID = itm1.id;
        }
      }
      this.GetSubsubCat();
    });
  }

  GetSubsubCat() {

    this.PostAdd.GetAllSubSubCategoriesBySubCatID(this.SubCatID).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
  }

  SubCatSel(id) {

    console.log('Sub-Cat ID issssssssss:', id);
    for(const itm of this.GetAllSubCat) {
      if(itm.Sub_Cat_Name_id === id) {
        this.SubCatID = itm.id;
      }
    }
    this.PostAdd.GetAllSubSubCategoriesBySubCatID(this.SubCatID).subscribe(resSlidersData => {
      this.GetAllSubSubCat = resSlidersData
    });
  }

  EnableAuction(Auction) {
      this.model.Auction = Auction;
  }

  EnableFixd(Auction) {
      this.model.Auction = Auction;
  }

  AddReservePriceFun() {
    if ( this.ReservePrice === true ) {
      this.ReservePrice = false;
    } else {
      this.ReservePrice = true;
    }
  }

  clearSessionstoreage() {
    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
      Swal.fire('You have been successfully signed out from Dhaar.','','success');
    }
  }

}
