import { Component, OnInit } from '@angular/core';
import { SensorsService } from './services/sensors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sensors-visualizer';

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {}

  removeAllData(): void {
    this.sensorsService.removeSensorsData();
  }
}
