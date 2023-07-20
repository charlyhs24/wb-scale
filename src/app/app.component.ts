import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NgxSerial } from 'ngx-serial';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public port: any;
  public portIsOpen: boolean;
  public indicatorValue: string;
  public weightScaleFormGroup = new FormGroup({
    date: new FormControl(''),
    policeNumber: new FormControl(''),
    driverName: new FormControl(''),
    bruto: new FormControl(''),
  });

  private serial: any;
  constructor() {
    this.portIsOpen = false;
    this.indicatorValue = 'US,NT,+000000.Kg';
  }

  ngOnInit(): void {
    this.serial = new NgxSerial(
      this.dataHandler.bind(this),
      {
        baudRate: 9600,
        dataBits: 7,
        parity: 'even',
      },
      '\n'
    );
  }
  public scaleButton(): void {
    this.requestPorts();
  }

  public stopButton(): void {
    this.close();
    let indicatorValueToArr: Array<String> = this.indicatorValue.split('+');
    let valueOfScale = indicatorValueToArr[1].split('.');
    this.weightScaleFormGroup.controls['bruto'].setValue(
      parseInt(valueOfScale[0])
    );
  }

  weightScaleFormOnSubmit(): void {
    console.log('submited');
  }
  private async requestPorts() {
    if ('serial' in navigator) {
      this.connect();
    }
    // alert this browser not support serial port
  }

  private dataHandler(data: string) {
    this.indicatorValue = data;
  }

  private connect(): void {
    this.portIsOpen = true;
    if (!this.port) {
      this.serial.connect((port: any) => {
        this.port = port;
      });
    }
  }

  private close(): void {
    this.portIsOpen = false;
    if (this.port)
      this.serial.close((port: any) => {
        this.port = port;
      });
  }
}
