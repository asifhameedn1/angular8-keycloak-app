// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Keycloak.TestApi "https" launch profile. Don't use its http URL (5136) while
 * the https profile is running: it redirects to https, and browsers reject
 * redirected CORS preflights.
 */
const apiUrl = 'https://localhost:7159';

export const environment = {
  production: false,
  keycloak: {
    // Realm and client come from keycloak.testApp/keycloak/test-realm-realm.json
    url: 'http://localhost:8080',
    realm: 'test-realm',
    clientId: 'keycloak-test-app'
  },
  apiUrl,
  // Only requests to these prefixes get an Authorization header, so tokens are
  // never sent to third parties. Trailing slash so e.g. :71590 can't match.
  bearerUrlPrefixes: [`${apiUrl}/`]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
