import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';

/**
 * Thin wrapper around keycloak-js (keycloak-angular needs Angular 5+).
 * keycloak-js 9 returns native Promises, so they're passed straight through.
 */
@Injectable()
export class KeycloakService {
  private instance: Keycloak.KeycloakInstance | null = null;

  init(config: Keycloak.KeycloakConfig, initOptions: Keycloak.KeycloakInitOptions): Promise<boolean> {
    this.instance = Keycloak(config);
    return toPromise<boolean>(this.instance.init(initOptions));
  }

  getKeycloakInstance(): Keycloak.KeycloakInstance | null {
    return this.instance;
  }

  get authenticated(): boolean {
    return !!(this.instance && this.instance.authenticated);
  }

  /** Realm roles plus roles from every client in the token. */
  getUserRoles(): string[] {
    const kc = this.instance;
    if (!kc) {
      return [];
    }
    let roles: string[] = [];
    const resourceAccess: any = kc.resourceAccess || {};
    Object.keys(resourceAccess).forEach(key => {
      roles = roles.concat(resourceAccess[key].roles || []);
    });
    if (kc.realmAccess) {
      roles = roles.concat(kc.realmAccess.roles || []);
    }
    return roles;
  }

  login(options?: Keycloak.KeycloakLoginOptions): Promise<void> {
    return toPromise<void>(this.requireInstance().login(options));
  }

  /**
   * keycloak-js 9 sends the legacy `redirect_uri` parameter, which Keycloak 18+
   * ignores and shows a "Do you want to log out?" confirmation instead. Sending
   * `id_token_hint` + `post_logout_redirect_uri` (RP-initiated logout) ends the
   * session immediately and redirects without asking.
   */
  logout(redirectUri?: string): Promise<void> {
    const kc = this.requireInstance();
    const idToken = kc.idToken;
    let url = `${kc.authServerUrl.replace(/\/$/, '')}/realms/${encodeURIComponent(kc.realm)}` +
      `/protocol/openid-connect/logout?client_id=${encodeURIComponent(kc.clientId)}`;
    if (idToken) {
      url += `&id_token_hint=${encodeURIComponent(idToken)}`;
    }
    if (redirectUri) {
      url += `&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
    kc.clearToken();
    window.location.replace(url);
    return new Promise<void>(() => {});
  }

  updateToken(minValidity = 5): Promise<boolean> {
    return toPromise<boolean>(this.requireInstance().updateToken(minValidity));
  }

  private requireInstance(): Keycloak.KeycloakInstance {
    if (!this.instance) {
      throw new Error('Keycloak is not initialised.');
    }
    return this.instance;
  }
}

function toPromise<T>(p: any): Promise<T> {
  return Promise.resolve(p) as Promise<T>;
}
