import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Meter } from './../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  httpRequest: string =
    'https://parking-e3651-default-rtdb.europe-west1.firebasedatabase.app/fullinfo.json';
  metersInfo: Meter[] = [];

  initialInfoSub = new BehaviorSubject<Meter[]>(this.metersInfo);
  destroySubscriptions$: Subject<boolean> = new Subject<boolean>();

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
    this.http
      .put(this.httpRequest, this.metersInfo)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe();
  }

  getInitialInfo() {
    this.http
      .get<Meter[]>(this.httpRequest)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((metersInfo) => {
        this.metersInfo = metersInfo;
        this.initialInfoSub.next(this.metersInfo);
      });
  }

  changeItem(meter: Meter) {
    let index = this.metersInfo.findIndex((meter) => meter.id === meter.id);
    this.metersInfo[index] = meter;
    this.http
      .put(this.httpRequest, this.metersInfo)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
    this.destroySubscriptions$.unsubscribe();
  }
}
