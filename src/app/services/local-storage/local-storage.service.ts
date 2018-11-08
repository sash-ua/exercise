import {InjectionToken} from '@angular/core';

export const BROWSER_LOCAL_STORAGE = new InjectionToken('browser localStorage', {
  providedIn: 'root',
  factory: () => localStorage
});
