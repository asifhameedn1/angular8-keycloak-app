// TODO: point these at your production Keycloak server and API.
const apiUrl = 'https://localhost:7159';

export const environment = {
  production: true,
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'test-realm',
    clientId: 'keycloak-test-app'
  },
  apiUrl,
  bearerUrlPrefixes: [`${apiUrl}/`]
};
