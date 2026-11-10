import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeKeycloak } from './auth/keycloak-init';
import { ApiBearerInterceptor } from './auth/api-bearer.interceptor';
import { HomeComponent } from './pages/home.component';
import { ProfileComponent } from './pages/profile.component';
import { AdminComponent } from './pages/admin.component';
import { ForbiddenComponent } from './pages/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiBearerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
