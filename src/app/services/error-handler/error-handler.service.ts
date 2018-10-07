import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {
  }

  public handleError<T>(serviceName = '') {
    return (e: HttpErrorResponse): Observable<boolean> => {
      console.error(`Code: ${e.status}, \n Body: ${e.error} in ${serviceName}`);
      return of(false);
    };
  }
}
