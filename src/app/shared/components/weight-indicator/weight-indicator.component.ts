import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weight-indicator',
  templateUrl: './weight-indicator.component.html',
  styleUrls: ['./weight-indicator.component.scss'],
})
export class WeightIndicatorComponent implements OnInit, OnChanges {
  public styleIndicatorValue = {
    color: 'red',
    fontSize: '40px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    fontFamily: 'sans-serif',
  };

  public styleIndicator = {
    backgroundColor: 'black',
    borderRadius: '5px',
    height: '30px',
    padding: '20px',
  };

  @Input()
  indicatorInput: FormControl = new FormControl('');

  @Output()
  requestPortEvent: EventEmitter<boolean>;
  constructor() {
    this.requestPortEvent = new EventEmitter(false);
  }

  ngOnInit(): void {}
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('component', this.indicatorValue);
  }
  requestPorts(): void {
    this.requestPortEvent.emit(true);
  }
}
