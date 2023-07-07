import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  public state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nexState: T): void {
    this._state$.next(nexState);
  }
}
