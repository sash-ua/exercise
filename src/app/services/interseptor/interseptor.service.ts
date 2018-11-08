import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {INIT_DATA} from '../../data';

export type Template = {
  id: number,
  name: string,
  template: string,
  modified: number
};

export type Response = {
  body: Template[]
};

@Injectable({
  providedIn: 'root'
})
export class InterseptorService implements HttpInterceptor {

  constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cached: Response,
      temp: string;
    if (req.body) {
      localStorage.setItem(INIT_DATA.texts.http, JSON.stringify(req.body));
    } else {
      temp = localStorage.getItem(INIT_DATA.texts.http);
      cached = temp ? JSON.parse(temp) : localStorage.setItem(INIT_DATA.texts.http, JSON.stringify(INIT_DATA.templates));
    }
    return temp ? of(new HttpResponse({body: cached})) : of(new HttpResponse({body: INIT_DATA.templates}));
  }
}
