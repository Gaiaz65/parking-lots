import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkingDetailComponent } from './parking-detail/parking-detail.component';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { AddMeterComponent } from './add-meter/add-meter.component';

@NgModule({
  declarations: [AppComponent, ParkingDetailComponent, ParkingListComponent, AddMeterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
