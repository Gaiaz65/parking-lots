import { DataService } from './services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dService:DataService) {}
  ngOnInit(): void {
    this.dService.getInitialInfo();
  }
  title = 'parking-lots';
}
