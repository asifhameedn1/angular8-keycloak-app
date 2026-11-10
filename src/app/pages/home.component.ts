import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  template: `
    <h1>Home</h1>
    <p>This page is public.</p>

    <ng-container *ngIf="auth.isLoggedIn; else anon">
      <p>Signed in as <strong>{{ auth.displayName }}</strong>. Try the API:</p>
      <div class="actions">
        <button (click)="call('values')">GET api/values</button>
        <button (click)="call('me')">GET api/values/me</button>
        <button (click)="call('admin')">GET api/values/admin</button>
      </div>
      <pre *ngIf="result" [class.error]="isError">{{ result }}</pre>
    </ng-container>
    <ng-template #anon>
      <p>You're not signed in. <button (click)="auth.login()">Log in</button></p>
    </ng-template>
  `
})
export class HomeComponent {
  result = '';
  isError = false;

  constructor(public auth: AuthService, private api: ApiService) {}

  call(which: 'values' | 'me' | 'admin'): void {
    const request = which === 'values' ? this.api.getValues()
      : which === 'me' ? this.api.getMe()
      : this.api.getAdmin();

    this.result = 'Loading…';
    this.isError = false;
    request.subscribe(
      data => this.result = JSON.stringify(data, null, 2),
      err => {
        this.isError = true;
        this.result = err.status === 0
          ? 'Network/CORS error: is Keycloak.TestApi running on its https profile?'
          : `${err.status} ${err.statusText}`;
      }
    );
  }
}
