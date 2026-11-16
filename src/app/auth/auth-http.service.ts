import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { KeycloakService } from './keycloak.service';
import { environment } from '../../environments/environment';

/**
 * Stands in for an HttpInterceptor (Angular 4.3+): adds
 * `Authorization: Bearer <token>` to requests for our own API only,
 * refreshing the token first if it expires within 30 seconds.
 */
@Injectable()
export class AuthHttp {
  constructor(private http: Http, private keycloak: KeycloakService) {}

  get(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    const forApi = environment.bearerUrlPrefixes.some(prefix => url.indexOf(prefix) === 0);
    const instance = this.keycloak.getKeycloakInstance();
    if (!forApi || !instance || !instance.authenticated) {
      return this.http.get(url, options);
    }

    return Observable.fromPromise(this.keycloak.updateToken(30)).mergeMap(() => {
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${instance.token}`);
      return this.http.get(url, Object.assign({}, options, { headers }));
    });
  }
}
