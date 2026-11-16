# Angular2KeycloakApp

Angular 2.4 app secured with Keycloak (keycloak-js 9), built with [Angular CLI](https://github.com/angular/angular-cli) 1.0.6.

Auth is wired up in `src/app/auth/`:

- `keycloak.service.ts`: a thin wrapper around keycloak-js. keycloak-angular needs Angular 5+, so it isn't used.
- `keycloak-init.ts`: runs `check-sso` in an `APP_INITIALIZER` before the app renders.
- `auth.guard.ts`: sends anonymous users to the Keycloak login page and checks `data.roles` on routes.
- `auth-http.service.ts`: adds the bearer token to requests for the API in `environment.bearerUrlPrefixes`. Angular 2 has no `HttpInterceptor`, so API calls go through this wrapper.

## Commands

Use the npm scripts. They pass `--openssl-legacy-provider` so webpack 2 runs on current Node.

- `npm start`: dev server on `http://localhost:4200/`
- `npm run build`: build into `dist/`. Add `-- --prod` for a production (AOT) build.
- `npm test`: unit tests with Karma
- `npm run e2e`: end-to-end tests with Protractor
- `npm run lint`: TSLint
