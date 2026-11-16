import { KeycloakService } from './keycloak.service';
import { environment } from '../../environments/environment';

/** Set when Keycloak couldn't be reached at startup, so the UI can say so. */
export const keycloakStartup = { error: null as string | null };

/**
 * APP_INITIALIZER: initialise Keycloak before the app renders.
 *
 * check-sso picks up an existing Keycloak session silently (hidden iframe)
 * but doesn't force a login; protected routes do that via AuthGuard.
 */
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<void> {
  return () =>
    keycloak
      .init(environment.keycloak, {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
        pkceMethod: 'S256',
        // keycloak-js 9 expects the nonce in the access and refresh tokens too,
        // but Keycloak 25+ only puts it in the ID token, so the check always
        // fails and the login is discarded. PKCE + state still protect the
        // code flow against injection/replay.
        useNonce: false,
        // The session-status iframe relies on third-party cookies, which
        // browsers increasingly block; token refresh is handled on demand.
        checkLoginIframe: false
      } as any)
      .then(() => {
        // Keycloak 21+ adds `iss` to the login redirect; keycloak-js 9 doesn't
        // know it, so it's left behind as #iss=... in the address bar.
        if (/^#iss=[^&]*$/.test(window.location.hash)) {
          history.replaceState(history.state, '', window.location.pathname + window.location.search);
        }
        // Coming back from logout: go straight to the Keycloak login page.
        if (/[?&]relogin=1(&|$)/.test(window.location.search)) {
          history.replaceState(history.state, '', window.location.pathname);
          if (!keycloak.authenticated) {
            return keycloak.login({ redirectUri: window.location.origin + '/' })
              .then(() => new Promise<void>(() => {}));
          }
        }
      })
      .catch(err => {
        // Don't block the whole app if Keycloak is down; public pages still work.
        console.error('Keycloak init failed', err);
        keycloakStartup.error =
          `Keycloak sign-in failed (see the browser console). Check that Keycloak is running at ${environment.keycloak.url}.`;
      });
}
