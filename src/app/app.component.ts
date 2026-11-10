import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { keycloakStartup } from './auth/keycloak-init';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-keycloak-app';
  startupError = keycloakStartup.error;

  constructor(public auth: AuthService) {}
}
