import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.services';
import { LayoutComponent } from "./layout/layout.component";
import { TermsUseModule } from './terms-use/terms-use.module';
import { SellerProductSettingModule } from './seller-product-setting/seller-product-setting.module';
import { SellerDashboardMastersComponent } from './Layouts/seller-dashboard-masters/seller-dashboard-masters.component';
import { UserDashboardMasterComponent } from './Layouts/user-dashboard-master/user-dashboard-master.component';
// import { BuyerDashboardMastersComponent } from './Layouts/buyer-dashboard-masters/buyer-dashboard-masters.component';
// import { SellerDashboardLayoutComponent } from './Layouts/seller-dashboard-layout/seller-dashboard-layout.component';

const appRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'login', loadChildren: './log-in/log-in.module#LoginModule' },
      { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule' },
      { path: 'select-category', loadChildren: './select-category/select-category.module#SelectCategoryModule' },
      { path: 'single-product', loadChildren: './single-product/single-product.module#SingleProductModule' },
      { path: 'checkout2', loadChildren: './checkout2/checkout2.module#Checkout2Module' },
      { path: 'forget-password', loadChildren: './forget-password/forget-password.module#ForgetPasswordModule' },
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
      { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule' },
      // { path: 'post-ad', loadChildren: './post-ad/post-ad.module#PostAdModule', canActivate: [AuthGuard] },
      { path: 'about-us', loadChildren: './about-uss/about-uss.module#AboutUssModule' },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
      // { path: 'active-ad', loadChildren: './active-ad/active-ad.module#ActiveAdModule', canActivate: [AuthGuard]},
      // { path: 'pending-ad', loadChildren: './pending-ad/pending-ad.module#PendingAdModule', canActivate: [AuthGuard]},
      { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsModule' },
      { path: 'category-detail', loadChildren: './category-detail/category-detail.module#CategoryDetailModule' },
      //  { path: 'user-detail', loadChildren: './user-detail/user-detail.module#UserDetailModule', canActivate: [AuthGuard] },
      //  { path: 'user-shipment', loadChildren: './usershipment/usershipment.module#UserShipmentModule', canActivate: [AuthGuard] },
      // usershipmentupdate
      { path: 'user-shipment-create', loadChildren: './usershipmentupdate/usershipmentupdate.module#UserShipmentUpdateModule', canActivate: [AuthGuard] },
     { path: 'payment', loadChildren: './paymentmethod/paymentmethod.module#paymentModule'},
      //  { path: 'store-registration', loadChildren: './store-registration/store-registration.module#StoreRegistrationModule', canActivate: [AuthGuard] },

      { path: 'store-view', loadChildren: './store-all-details/store-all-details.module#StoreAllDetailsModule', canActivate: [AuthGuard] },

      { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule' },
      // { path: 'buyer-dashboard', loadChildren: './buyer-dashboard/buyer-dashboard.module#BuyerDashboardModule', canActivate: [AuthGuard] },
      // { path: 'my-bids', loadChildren: './my-bids/my-bids.module#MyBidsModule', canActivate: [AuthGuard]},
      // { path: 'my-bids-buyer', loadChildren: './my-bids-buyer/my-bids-buyer.module#MyBidsBuyerModule', canActivate: [AuthGuard] },
      // { path: 'buyer-orders', loadChildren: './buyer-order/buyer-order.module#BuyerOrderModule', canActivate: [AuthGuard] },
       { path: 'buyer-invoice', loadChildren: './buyer-invoice/buyer-invoice.module#BuyerInvoiceModule', canActivate: [AuthGuard] },
      // { path: 'seller-purchasing', loadChildren: './seller-purchasing/seller-purchasing.module#SellerPurchasingModule', canActivate: [AuthGuard]},
      { path: 'store/:storename', loadChildren: './store-template/store-template.module#StoreTemplateModule' },
      { path: 'sub-category-detail/:CatName/:SubCat', loadChildren: './sub-category-detail/sub-category-detail.module#SubCategoryDetailModule' },
      { path: 'subsub-category-detail/:CatName/:SubsubCat', loadChildren: './subsub-category-detail/subsub-category-detail.module#SubsubCategoryDetailModule' },
      // { path: 'account-setting', loadChildren: './buyer-setting/buyer-setting.module#BuyerSettingModule', canActivate: [AuthGuard] },
      // { path: 'seller-setting', loadChildren: './seller-setting/seller-setting.module#SellerSettingModule', canActivate: [AuthGuard]},
      { path: 'manage-coupons', loadChildren: './manage-coupons/manage-coupons.module#ManageCouponsModule', canActivate: [AuthGuard] },
      { path: 'reset/:uid/:token', loadChildren: './reset-password/reset-password.module#ResetPasswordModule', },
      { path: 'VerfiyEmail/:key', loadChildren: './verify-email/verify-email.module#VerfiyEmailModule', },
      // { path: 'watch-Product', loadChildren: './watch-product/watch-product.module#WatchProductModule', },
      // { path: 'buyer-offer', loadChildren: './buyer-offer/buyer-offer.module#BuyerOfferModule', canActivate: [AuthGuard] },
      // { path: 'seller-offer', loadChildren: './seller-offer/seller-offer.module#SellerOfferModule', canActivate: [AuthGuard]},
      { path: 'privacy-policy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
      { path: 'terms-use', loadChildren: './terms-use/terms-use.module#TermsUseModule' },
      { path: 'dhaar', loadChildren: './dhaar/dhaar.module#DhaarModule' },
      { path: 'file-uploads', loadChildren: './file-uploads/file-uploads.module#FileUploadsModule' },
      { path: 'sameurl', loadChildren: './sameurl/sameurl.module#SameurlModule' },

      // SellerProductSettingStoreModule
    ]
  },

  
  {
    path: '',    component: UserDashboardMasterComponent,
    children: [
      { path: 'buyer-dashboard', loadChildren: './buyer-dashboard/buyer-dashboard.module#BuyerDashboardModule', canActivate: [AuthGuard] },
      { path: 'my-bids-buyer', loadChildren: './my-bids-buyer/my-bids-buyer.module#MyBidsBuyerModule', canActivate: [AuthGuard] },
      { path: 'buyer-orders', loadChildren: './buyer-order/buyer-order.module#BuyerOrderModule', canActivate: [AuthGuard] },
      { path: 'buyer-invoice', loadChildren: './buyer-invoice/buyer-invoice.module#BuyerInvoiceModule', canActivate: [AuthGuard] },
      { path: 'buyer-offer', loadChildren: './buyer-offer/buyer-offer.module#BuyerOfferModule', canActivate: [AuthGuard] },
      { path: 'buyer-store-registration', loadChildren: './store-registration/store-registration.module#StoreRegistrationModule', canActivate: [AuthGuard] },
      { path: 'watch-Product', loadChildren: './watch-product/watch-product.module#WatchProductModule', canActivate: [AuthGuard] },
      { path: 'buyer-user-shipment', loadChildren: './usershipment/usershipment.module#UserShipmentModule', canActivate: [AuthGuard] },
      { path: 'user-detail', loadChildren: './user-detail/user-detail.module#UserDetailModule', canActivate: [AuthGuard] },
      { path: 'account-setting', loadChildren: './buyer-setting/buyer-setting.module#BuyerSettingModule', canActivate: [AuthGuard] },
      { path: 'select-categorys', loadChildren: './select-category/select-category.module#SelectCategoryModule',canActivate: [AuthGuard] },
      { path: 'post-ads', loadChildren: './post-ad/post-ad.module#PostAdModule', canActivate: [AuthGuard] },
      // { path: 'watch-Product', loadChildren: './watch-product/watch-product.module#WatchProductModule', },

    ]
  },
  {
    path: '',
    component: SellerDashboardMastersComponent,
    children: [

      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
      { path: 'seller-product-setting', loadChildren: './seller-product-setting/seller-product-setting.module#SellerProductSettingModule' },
      { path: 'seller-product-setting-store', loadChildren: './seller-product-setting-store/seller-product-setting-store.module#SellerProductSettingStoreModule' },
      { path: 'my-bids', loadChildren: './my-bids/my-bids.module#MyBidsModule', canActivate: [AuthGuard] },
      { path: 'active-ad', loadChildren: './active-ad/active-ad.module#ActiveAdModule', canActivate: [AuthGuard] },
      { path: 'pending-ad', loadChildren: './pending-ad/pending-ad.module#PendingAdModule', canActivate: [AuthGuard] },
      { path: 'select-categoryss', loadChildren: './select-category/select-category.module#SelectCategoryModule',canActivate: [AuthGuard] },
      { path: 'seller-offer', loadChildren: './seller-offer/seller-offer.module#SellerOfferModule', canActivate: [AuthGuard] },
      { path: 'seller-purchasing', loadChildren: './seller-purchasing/seller-purchasing.module#SellerPurchasingModule', canActivate: [AuthGuard] },
      { path: 'seller-user-detail', loadChildren: './seller-user-detail/seller-user-detail.module#SellerUserDetailModule', canActivate: [AuthGuard] },
      { path: 'seller-setting', loadChildren: './seller-setting/seller-setting.module#SellerSettingModule', canActivate: [AuthGuard] },
      { path: 'seller-order-receive', loadChildren: './seller-receive-order/seller-receive-order.module#SellerReceiveorderModule', canActivate: [AuthGuard] },
      { path: 'store-registration', loadChildren: './store-registration/store-registration.module#StoreRegistrationModule', canActivate: [AuthGuard] },
      { path: 'watch-Product-seller', loadChildren: './watch-product/watch-product.module#WatchProductModule',canActivate: [AuthGuard]  },
      { path: 'user-shipment', loadChildren: './usershipment/usershipment.module#UserShipmentModule', canActivate: [AuthGuard] },
      { path: 'seller-purchasing-invoice', loadChildren: './seller-purchasing-invoice/seller-purchasing-invoice.module#SellerPurchasingInvoiceModule', canActivate: [AuthGuard] },
      { path: 'post-ad', loadChildren: './post-ad/post-ad.module#PostAdModule', canActivate: [AuthGuard] },
      
      { path: 'add-payment-method', loadChildren: './add-payment-method/add-payment-method.module#AddPaymentMethod', canActivate: [AuthGuard] },

      // SellerSettingStoreUpdateModule

    ]
  }
];

export const AppRoutingProvider: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
