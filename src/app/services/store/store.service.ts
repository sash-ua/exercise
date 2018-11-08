import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

export type State = {
  active: number,
  response: any,
  showEditor: boolean
  editing?: any,
  aciveTemplate?: HTMLElement,
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _store: BehaviorSubject<State>;

  init(s: State) {
    this._store = new BehaviorSubject<State>(s);
  }

  set(s: State) {
    this._store.next(s);
  }

  get() {
    return this._store;
  }
}
