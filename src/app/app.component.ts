import { Component } from '@angular/core';

import { NgxSerial } from 'ngx-serial';
import { WeighIndicatorStore } from './store/weigh-indicator/weigh-indicator.store';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeighIndicatorStore],
})
export class AppComponent {
  indicatorInput = new FormControl('');
  arrValue: Array<String> = [''];
  port: any;
  title = 'weight-scale-client';
  public indicatorValue: string = '';
  private serial: any;
  constructor(public store: WeighIndicatorStore) {}

  ngOnInit(): void {
    this.serial = new NgxSerial(
      this.dataHandler,
      this.store.state.options,
      '\n'
    );
  }
  public async requestPorts() {
    if ('serial' in navigator) {
      this.connect();
    }
    // alert this browser not support serial port
  }

  dataHandler(data: string) {
    // console.log(data);
    // this.store.setIndicatorvalue('hello world');
    this.arrValue.push(data);
  }

  private connect(): void {
    if (!this.port) {
      this.serial.connect((port: any) => {
        this.port = port;
      });
    }
  }

  private close(): void {
    if (this.port)
      this.serial.close((port: any) => {
        this.port = port;
      });
  }
}
