import {Component, OnDestroy} from '@angular/core';
import {State, StoreService} from "../services/store/store.service";
import {Subscription} from "rxjs/internal/Subscription";
import {NgForm} from "@angular/forms";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {INIT_DATA} from "../data";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnDestroy {
  public state: State;
  private s: Subscription;

  constructor(private store: StoreService, private http: HttpClient) {
    this.s = this.store.get().subscribe(r => this.state = r)
  }

  editor(fD: NgForm, e: Event) {
    if (fD.form.valid) {
      const req = new HttpRequest('POST', INIT_DATA.url, this.state.response.body);
      this.state.showEditor = false;
      this.state.response.body[this.state.active].template = this.state.aciveTemplate.innerHTML;
      this.state.response.body[this.state.active].modified = Date.now();
      this.http.request(req).subscribe();
    }
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
