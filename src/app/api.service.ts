import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

/** Calls Keycloak.TestApi's ValuesController. */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = `${environment.apiUrl}/api/values`;

  constructor(private http: HttpClient) {}

  /** Any signed-in user. */
  getValues(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  /** Who the API thinks the caller is. */
  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  /** Requires the "admin" role. */
  getAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`);
  }
}
