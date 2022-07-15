import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v1 as uuidv1 } from 'uuid';
import { Observable } from 'rxjs';
import { DateInterface } from '../interfaces/dates';

export enum SensorType {
  TEMPERATURE = 'temperature',
  VIBRATION = 'vibration',
}

export interface SensorData {
  type: SensorType;
  value: number[];
}

export interface EnginesInterface {
  engineId: string;
}

export interface Measure {
  id: string;
  engineId: string;
  measureDate: Date;
  sensorsData: SensorData[];
}

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor(private http: HttpClient) {}

  sendSensorData(measures: Measure[]): void {
    this.http
      .post('http://localhost:8080/api/records', measures)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getSensorsData(): void {
    this.http.get('http://localhost:8080/api/records').subscribe((res) => {
      console.log(res);
    });
  }

  getSensorData(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/records/${id}`);
  }

  getDates(engineId: string): Observable<DateInterface[]> {
    return this.http.get<DateInterface[]>(
      `http://localhost:8080/api/dates/${engineId}`
    );
  }

  getEngines(): Observable<EnginesInterface[]> {
    return this.http.get<EnginesInterface[]>(
      `http://localhost:8080/api/engines`
    );
  }

  removeSensorsData(): void {
    this.http.delete('http://localhost:8080/api/records').subscribe((res) => {
      console.log(res);
    });
  }
}
