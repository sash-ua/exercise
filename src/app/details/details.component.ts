import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {State, StoreService} from "../services/store/store.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnDestroy, OnInit {
  public state: State;
  private s: Subscription;
  @ViewChild("el", {read: ElementRef}) el: ElementRef;

  @HostListener('mouseup', ['$event']) onClick(e) {
    if (e.target.className === 'editable' && window.getSelection().toString().length > 0) {
      this.state.editing = e;
      this.state.showEditor = true;
      this.store.set(this.state);
    }
  }

  constructor(private store: StoreService) {
    this.s = this.store.get().subscribe(r => {
      this.state = r;
    });
  }

  ngOnInit() {
    this.state.aciveTemplate = this.el.nativeElement;
    this.store.set(this.state);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
