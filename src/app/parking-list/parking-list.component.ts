import { Component, OnInit } from '@angular/core';

import { DataService } from './../services/data-service.service';
import { Meter } from '../models/data.model';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
})
export class ParkingListComponent implements OnInit {
  creationMode = false;
  metersInfo: Meter[] = [];

  constructor(private dService: DataService) {}

  ngOnInit(): void {
    this.dService.initialInfoSub.subscribe(
      (metersInfo) => {
        this.metersInfo = metersInfo;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
