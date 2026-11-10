import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

/**
 * Adds `Authorization: Bearer <token>` to requests for our own API only,
 * refreshing the token first if it expires within 30 seconds.
 */
@Injectable()
export class ApiBearerInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const forApi = environment.bearerUrlPrefixes.some(prefix => req.url.startsWith(prefix));
    const instance = this.keycloak.getKeycloakInstance();
    if (!forApi || !instance || !instance.authenticated) {
      return next.handle(req);
    }

    return from(this.keycloak.updateToken(30)).pipe(
      mergeMap(() =>
        next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${instance.token}` } }))
      )
    );
  }
}
