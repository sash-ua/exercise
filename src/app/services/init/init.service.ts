import {Injectable} from '@angular/core';
import {INIT_DATA} from "../../data";
import {HttpService} from "../http/http.service";
import {StoreService} from "../store/store.service";
import {HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InitService {
  
  constructor(protected http: HttpService, private store: StoreService) {
  }

  initApp() {
    const req: HttpRequest<any> = new HttpRequest<any>('GET', INIT_DATA.url);
    const temp = this.http.request(req).subscribe(r => {
      const cache = localStorage.getItem(INIT_DATA.texts.cache);
      const st = cache
        ? {
          active: JSON.parse(cache).active,
          response: r,
          showEditor: false
        }
        : {
          active: 0,
          response: r,
          showEditor: false
        };
      this.store.init(st);
      localStorage.setItem(INIT_DATA.texts.cache, JSON.stringify(st))
    });
    temp.unsubscribe();
  }
}
