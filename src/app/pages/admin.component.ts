import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  template: `
    <h1>Admin</h1>
    <p>Hello {{ auth.displayName }}, you have the <code>admin</code> role.</p>
  `
})
export class AdminComponent {
  constructor(public auth: AuthService) {}
}
