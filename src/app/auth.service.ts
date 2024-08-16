import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://your-backend-api.com/login';
  private signupUrl = 'https://your-backend-api.com/signup';  // Replace with your signup API URL

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, signupData);
  }
}
