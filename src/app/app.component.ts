import { Component } from '@angular/core';

import { NgxSerial } from 'ngx-serial';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private serial: NgxSerial;
  port: any;
  title = 'weight-scale-client';
  public indicator: string;

  constructor() {
    this.indicator = 'ST 00000 UK';
    let options = { baudRate: 9600, dataBits: 7, parity: 'even' };
    this.serial = new NgxSerial(this.dataHandler, options, '\n');
  }

  public async requestPorts() {
    if ('serial' in navigator) {
      this.connect();
    }
    // alert this browser not support serial port
  }

  dataHandler(data: string) {
    console.log('data handler', data);
    this.indicator = data;
  }

  private connect(): void {
    this.serial.connect((port: any) => {
      this.port = port;
    });
  }

  private disconnect(): void {
    this.serial.close((port: any) => {
      this.port = port;
    });
  }
}
