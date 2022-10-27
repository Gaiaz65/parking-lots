import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { Meter } from './../models/data.model';
import { DataService } from './../services/data-service.service';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
})
export class ParkingDetailComponent implements OnInit {
  isDisabled = false;
  singleMeter!: Meter;
  id!: string | null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dService: DataService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let singleMeter = this.dService.metersInfo.find(
      (meter) => meter.id === Number(this.id)
    );
    if (singleMeter) {
      this.singleMeter = singleMeter;
      return;
    }
    this.router.navigate(['/list']);
  }

  useTheMeter() {
    this.singleMeter.usages++;
    this.isDisabled = true;
    this.dService.changeItem(this.singleMeter);
  }

  toggleStatus(e?: MouseEvent) {
    if (!!e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.singleMeter.status === 'Enabled'
      ? (this.singleMeter.status = 'Disabled')
      : (this.singleMeter.status = 'Enabled');
    this.dService.changeItem(this.singleMeter);
  }
}
