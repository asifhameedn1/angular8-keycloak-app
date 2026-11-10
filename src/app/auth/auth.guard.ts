import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

/**
 * Redirects to the Keycloak login page if the user isn't signed in.
 * Routes can require roles with `data: { roles: ['admin'] }` (realm or client roles).
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }

    const required: string[] = route.data.roles || [];
    if (required.every(role => this.roles.includes(role))) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}
