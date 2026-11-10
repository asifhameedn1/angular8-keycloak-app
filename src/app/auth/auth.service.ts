import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

/** Convenience wrapper so components don't talk to keycloak-js directly. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  private get token(): any {
    const instance = this.keycloak.getKeycloakInstance();
    return (instance && instance.tokenParsed) || null;
  }

  get isLoggedIn(): boolean {
    const instance = this.keycloak.getKeycloakInstance();
    return !!(instance && instance.authenticated);
  }

  get username(): string {
    return this.token ? this.token.preferred_username : '';
  }

  get displayName(): string {
    return this.token ? this.token.name || this.token.preferred_username : '';
  }

  get email(): string {
    return this.token ? this.token.email : '';
  }

  get subject(): string {
    return this.token ? this.token.sub : '';
  }

  get expiresAt(): Date | null {
    return this.token ? new Date(this.token.exp * 1000) : null;
  }

  get realmRoles(): string[] {
    return (this.token && this.token.realm_access && this.token.realm_access.roles) || [];
  }

  get clientRoles(): string[] {
    const access = this.token && this.token.resource_access;
    const client = access && access[environment.keycloak.clientId];
    return (client && client.roles) || [];
  }

  /** True if the user has every given role (realm or this client's roles). */
  hasRoles(...roles: string[]): boolean {
    const granted = [...this.realmRoles, ...this.clientRoles];
    return roles.every(r => granted.includes(r));
  }

  login(): Promise<void> {
    return this.keycloak.login({ redirectUri: window.location.href });
  }

  logout(): Promise<void> {
    return this.keycloak.logout(window.location.origin + '/');
  }
}
