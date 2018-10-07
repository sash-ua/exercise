import {Component, OnDestroy, Renderer2} from '@angular/core';
import {INIT_DATA} from "./data";
import {InitService} from "./services/init/init.service";
import {Subscription} from "rxjs/internal/Subscription";
import {State, StoreService} from "./services/store/store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  public title = INIT_DATA.texts.title;
  public home = INIT_DATA.texts.home;
  public state: State;
  private s: Subscription;

  constructor(private init: InitService, private store: StoreService, private rnr2: Renderer2) {
    this.init.initApp();
    this.s = this.store.get().subscribe(r => this.state = r);
    this.rnr2.listen('body', 'keyup', (event) => {
      if (event.code === 'Escape') {
        this.state.showEditor = false;
        this.store.set(this.state);
      }
    })
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
