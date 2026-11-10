import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <h1>Profile</h1>
    <p>Any signed-in user can see this page.</p>
    <dl>
      <dt>Username</dt><dd>{{ auth.username }}</dd>
      <dt>Name</dt><dd>{{ auth.displayName }}</dd>
      <dt>Email</dt><dd>{{ auth.email || '—' }}</dd>
      <dt>Subject</dt><dd>{{ auth.subject }}</dd>
      <dt>Realm roles</dt><dd>{{ auth.realmRoles.join(', ') || '—' }}</dd>
      <dt>Client roles</dt><dd>{{ auth.clientRoles.join(', ') || '—' }}</dd>
      <dt>Token expires</dt><dd>{{ auth.expiresAt | date:'medium' }}</dd>
    </dl>
  `
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}
