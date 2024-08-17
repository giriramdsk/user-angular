import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthStateService } from './state/auth.state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private authStateService: AuthStateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Clone the request to add the new header.
    const authReq = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is invalid or expired, redirect to login
          localStorage.removeItem('token');
        this.authStateService.setAuthState(false);
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
