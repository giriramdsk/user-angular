import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3100/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, data);
  }

  // getUsers(params: any) {
  //   return this.http.get<any[]>(`${this.apiUrl}/users`, { params });
  // }
  getUsers(page: number, limit: number, sortBy: string, sortOrder: string, search: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('search', search);

    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Example token check
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
  }
}
