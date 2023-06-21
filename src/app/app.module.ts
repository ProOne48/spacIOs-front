import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from "@abacritt/angularx-social-login";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthInterceptor } from '../services/auth/auth.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MainComponent } from './main/main.component';
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthContainerComponent } from './auth-container/auth-container.component';

export const materialImports = [
  MatToolbarModule,
  MatSnackBarModule,
  MatSelectModule
];

export const globalImports = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  SocialLoginModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [AppComponent, LoginComponent, MainComponent, NavbarComponent, FooterComponent, AuthContainerComponent],
  imports: [...globalImports, ...materialImports, GoogleSigninButtonModule],
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          }
        ]
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
