import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.loggedIn.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  setAuthState(isLoggedIn: boolean) {
    this.loggedIn.next(isLoggedIn);
  }
}
