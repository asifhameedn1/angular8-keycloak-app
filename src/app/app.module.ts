import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttp } from './auth/auth-http.service';
import { AuthService } from './auth/auth.service';
import { KeycloakService } from './auth/keycloak.service';
import { initializeKeycloak } from './auth/keycloak-init';
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
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    KeycloakService,
    AuthService,
    AuthGuard,
    AuthHttp,
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
