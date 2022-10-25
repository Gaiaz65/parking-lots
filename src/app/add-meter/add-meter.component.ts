import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataService } from './../services/data-service.service';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
})
export class AddMeterComponent {
  form = new FormGroup({
    address: new FormControl(),
    status: new FormControl(),
    counter: new FormControl(),
  });

  onSubmit() {
    this.dService.addMeter(this.form);
    this.form.reset();
  }

  constructor(private dService:DataService) {}
}
