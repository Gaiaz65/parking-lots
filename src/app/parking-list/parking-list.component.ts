import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

import { DataService } from './../services/data-service.service';
import { Meter } from '../models/data.model';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
})
export class ParkingListComponent implements OnInit, OnDestroy {
  metersSub$ = new Subscription();
  isDescending: boolean | undefined = true;
  creationMode = false;
  metersInfo: Meter[] = [];

  constructor(private dService: DataService) {}

  ngOnInit() {
    this.metersSub$ = this.dService.initialInfoSub.subscribe({
      next: (metersInfo) => {
        this.metersInfo = this.sortByAddress(metersInfo);
      },
      error: (error) => alert('Something went wrong, try again later!'),
    });
  }

  onClickSort() {
    this.metersInfo = this.sortByAddress(this.metersInfo);
  }

  sortByAddress(metersInfo: Meter[]): Meter[] {
    if (this.isDescending) {
      this.isDescending = !this.isDescending;
      return metersInfo.sort((a, b) => (a.address > b.address ? -1 : 1));
    } else {
      this.isDescending = true;
      return metersInfo.sort((a, b) => (a.address > b.address ? 1 : -1));
    }
  }
  ngOnDestroy() {
    this.metersSub$.unsubscribe();
  }
}
