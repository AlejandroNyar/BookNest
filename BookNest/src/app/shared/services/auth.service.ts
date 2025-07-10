import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) this.userSubject.next(JSON.parse(user));
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/signup`, data).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }
}
