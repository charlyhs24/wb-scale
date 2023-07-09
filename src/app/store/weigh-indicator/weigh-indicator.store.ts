import { Injectable } from '@angular/core';
import { Store } from '../store';
import { WeighIndicatorState } from './weigh-indicator-state';

@Injectable()
export class WeighIndicatorStore extends Store<WeighIndicatorState> {
  constructor() {
    super(new WeighIndicatorState());
  }

  setIndicatorvalue(indicatorVal: string): void {
    this.setState({
      ...this.state,
      indicatorValue: indicatorVal,
    });
  }

  setOptions(options: object): void {
    this.setState({
      ...this.state,
      options: options,
    });
  }
}
