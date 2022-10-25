import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParkingDetailComponent } from './parking-detail/parking-detail.component';
import { ParkingListComponent } from './parking-list/parking-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ParkingListComponent,
  },
  { path: ':id', component: ParkingDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
