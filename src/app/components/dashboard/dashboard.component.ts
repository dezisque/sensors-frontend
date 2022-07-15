import { Component, OnInit } from '@angular/core';
import { concatAll, take, tap } from 'rxjs';
import {
  EnginesInterface,
  SensorsService,
  SensorType,
} from '../../services/sensors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  temperatureChartConfig: any = null;
  vibrationChartConfig: any = null;
  isEmptyMessage: boolean = true;
  datesList: {
    measureDate: Date;
    measureId: string;
  }[] = [];
  enginesList: EnginesInterface[] = [];
  middleTemperature: number[] = [];
  middleVibration: number[] = [];
  selectedDateId: string = '';
  selectedEngineId: string = '';

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.sensorsService
      .getEngines()
      .pipe(
        take(1),
        tap((data) => {
          this.enginesList = data;
          console.log(this.enginesList);
        })
      )
      .subscribe();
  }

  getDateById(id: string): Date | undefined {
    return this.datesList.find((date) => date.measureId === id)?.measureDate;
  }

  getDatesList(): void {
    this.isEmptyMessage = true;
    this.datesList.length = 0;
    this.sensorsService
      .getDates(this.selectedEngineId)
      .pipe(
        take(1),
        concatAll(),
        tap((data) => {
          this.datesList.push({
            measureDate: new Date(data.measureDate),
            measureId: data.measureId,
          });
        })
      )
      .subscribe();
  }

  updateTemperatureChart(): void {
    this.temperatureChartConfig = {
      legend: {
        data: ['Температура'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        axisLabel: {
          show: false,
        },
        data: this.middleTemperature.map((_, i) => i),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Температура',
          type: 'bar',
          data: this.middleTemperature,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  updateVibrationChart(): void {
    this.vibrationChartConfig = {
      legend: {
        data: ['Вибрация'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        axisLabel: {
          show: false,
        },
        data: this.middleVibration.map((_, i) => i),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Вибрация',
          type: 'bar',
          data: this.middleVibration,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  loadDataByDate(): void {
    this.sensorsService
      .getSensorData(this.selectedDateId)
      .pipe(
        take(1),
        tap((measure) => {
          this.middleVibration.length = 0;
          this.middleTemperature.length = 0;
          if (measure.sensorsData.length) {
            this.isEmptyMessage = false;
          }
          measure.sensorsData.forEach((data: any) => {
            if (data.type === SensorType.TEMPERATURE) {
              this.middleTemperature.push(
                data.value.reduce((acc: number, it: number) => acc + it, 0) /
                  data.value.length
              );
            }
            if (data.type === SensorType.VIBRATION) {
              this.middleVibration.push(
                data.value.reduce((acc: number, it: number) => acc + it, 0) /
                  data.value.length
              );
            }
          });
          this.updateTemperatureChart();
          this.updateVibrationChart();
        })
      )
      .subscribe();
  }
}
