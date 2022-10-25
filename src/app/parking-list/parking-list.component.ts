import { Component, OnInit } from '@angular/core';

import { DataService } from './../services/data-service.service';
import { Meter } from '../models/data.model';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
})
export class ParkingListComponent implements OnInit {
  sorting:boolean | undefined = true
  creationMode = false;
  metersInfo: Meter[] = [];

  constructor(private dService: DataService) {}

  ngOnInit(): void {
    this.dService.initialInfoSub.subscribe(
      (metersInfo) => {
        this.metersInfo = metersInfo.sort((a, b) => (a.address > b.address ? 1 : -1))
      },
      () => {
        alert('Something went wrong, try again later!')
      }
    );
  }
  sortTheList(){
    if(this.sorting) {
      this.metersInfo.sort((a, b) => (a.address > b.address ? -1 : 1))
      this.sorting = undefined
    } else {
      this.metersInfo.sort((a, b) => (a.address > b.address ? 1 : -1));
      this.sorting = true;
    }

  }
}
