import {Component, OnDestroy} from '@angular/core';
import {INIT_DATA} from "../data";
import {State, StoreService} from "../services/store/store.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Template} from "../services/interseptor/interseptor.service";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnDestroy {
  public state: State;
  public modified = INIT_DATA.texts.modified;
  private s: Subscription;

  constructor(private store: StoreService) {
    this.s = this.store.get().subscribe(r => this.state = r)
  }

  upState(id: number) {
    this.store.set({
      active: id,
      response: this.state.response,
      editing: undefined,
      showEditor: false
    });
    localStorage.setItem(INIT_DATA.texts.cache, JSON.stringify(this.state))
  }

  trackById(index: number, st: Template): number {
    return st.id;
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}


