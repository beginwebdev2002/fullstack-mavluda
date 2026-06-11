import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { API_ENDPOINTS } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getCount(): Observable<number> {
    return this.http.get<number>(API_ENDPOINTS.USERS.COUNT);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_ENDPOINTS.USERS.URL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.USERS.URL_BY_ID(id));
  }

  createUser(user: Partial<User> | FormData): Observable<User> {
    return this.http.post<User>(API_ENDPOINTS.USERS.URL, user);
  }

  updateUser(id: string, user: Partial<User> | FormData): Observable<User> {
    return this.http.put<User>(API_ENDPOINTS.USERS.URL_BY_ID(id), user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.USERS.URL_BY_ID(id));
  }
}
