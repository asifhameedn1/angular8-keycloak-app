import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from './keycloak.service';

/**
 * Redirects to the Keycloak login page if the user isn't signed in.
 * Routes can require roles with `data: { roles: ['admin'] }` (realm or client roles).
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private keycloak: KeycloakService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (!this.keycloak.authenticated) {
      return this.keycloak
        .login({ redirectUri: window.location.origin + state.url })
        .then(() => false, () => false);
    }

    const required: string[] = (route.data && route.data['roles']) || [];
    const granted = this.keycloak.getUserRoles();
    if (required.every(role => granted.indexOf(role) !== -1)) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}
