import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, debounceTime, retry} from "rxjs/operators";
import {ErrorHandlerService} from "../error-handler/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public name = 'HttpService';

  constructor(protected eHS: ErrorHandlerService, protected http: HttpClient) {
  }

  public request(data: HttpRequest<any>): Observable<any> {
    return this.http.request<any>(data).pipe(
      retry(3),
      debounceTime(500),
      catchError(this.eHS.handleError(this.name))
    );
  }
}
