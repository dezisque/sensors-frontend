import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss'],
})
export class InputDataComponent implements OnInit {
  selectedFile: Blob | null = null;
  fileData: any;

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {}

  handleFileInput(e: any) {
    this.selectedFile = e.target.files[0];
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedFile, 'UTF-8');
      fileReader.onload = () => {
        this.fileData = JSON.parse(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        console.log(error);
      };
    }
  }

  sendData(): void {
    this.sensorsService.sendSensorData(this.fileData.measures);
  }
}
