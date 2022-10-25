import { Meter } from './../models/data.model';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  httpRequest: string =
    'https://parking-e3651-default-rtdb.europe-west1.firebasedatabase.app/fullinfo.json';
  metersInfo: Meter[] = [];
  initialInfoSub = new BehaviorSubject<Meter[]>(this.metersInfo);

  constructor(private http: HttpClient) {}

  addMeter(form: FormGroup) {
    let { address, status, counter } = form.value;
    let id = new Date().getTime();

    this.metersInfo.push({
      id: id,
      address: address,
      status: status,
      usages: counter,
    });
    this.http.put(this.httpRequest, this.metersInfo).subscribe();
  }

  getInitialInfo() {
    this.http.get<Meter[]>(this.httpRequest).subscribe((metersInfo) => {
      this.metersInfo = metersInfo;
      this.initialInfoSub.next(this.metersInfo);
    });
  }

  changeItem(meter: Meter) {
    let index = this.metersInfo.findIndex((meter) => meter.id === meter.id);
    this.metersInfo[index] = meter;
    this.http.put(this.httpRequest, this.metersInfo).subscribe();
  }
}
