import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from './auth/auth-http.service';
import { environment } from '../environments/environment';

/** Calls Keycloak.TestApi's ValuesController. */
@Injectable()
export class ApiService {
  private readonly baseUrl = `${environment.apiUrl}/api/values`;

  constructor(private http: AuthHttp) {}

  /** Any signed-in user. */
  getValues(): Observable<string[]> {
    return this.http.get(this.baseUrl).map((res: Response) => res.json());
  }

  /** Who the API thinks the caller is. */
  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`).map((res: Response) => res.json());
  }

  /** Requires the "admin" role. */
  getAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`).map((res: Response) => res.json());
  }
}
