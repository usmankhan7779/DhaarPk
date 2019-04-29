import { Routes, RouterModule }  from '@angular/router';
import {FileUploadsComponent} from "./file-uploads.component";


const routes: Routes = [
  {
    path: '',
    component: FileUploadsComponent
  }
];

export const routing = RouterModule.forChild(routes);
