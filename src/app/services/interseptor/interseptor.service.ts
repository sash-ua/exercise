import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {INIT_DATA} from '../../data';
import {BROWSER_LOCAL_STORAGE} from '../local-storage/local-storage.service';

export type Template = {
  id: number,
  name: string,
  template: string,
  modified: number
};

export type HttpData = {
  body: Template[]
};

@Injectable({
  providedIn: 'root'
})
export class InterseptorService implements HttpInterceptor {

  constructor(@Inject(BROWSER_LOCAL_STORAGE) private ls: Storage) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cached: HttpData,
      temp: string;
    if (req.body) {
      this.ls.setItem(INIT_DATA.texts.http, JSON.stringify(req.body));
    } else {
      temp = this.ls.getItem(INIT_DATA.texts.http);
      cached = temp ? JSON.parse(temp) : this.ls.setItem(INIT_DATA.texts.http, JSON.stringify(INIT_DATA.templates));
    }
    return temp ? of(new HttpResponse({body: cached})) : of(new HttpResponse({body: INIT_DATA.templates}));
  }
}
