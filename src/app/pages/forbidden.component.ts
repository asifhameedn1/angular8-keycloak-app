import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <h1>Access denied</h1>
    <p>You're signed in, but you don't have the role this page needs.</p>
    <a routerLink="/">Back to home</a>
  `
})
export class ForbiddenComponent {}
