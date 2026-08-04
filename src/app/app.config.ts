import {
  GoogleLoginProvider,
  SOCIAL_AUTH_CONFIG,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { environment } from '../environments/environment';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthInterceptor } from '../services/auth/auth.interceptor';

import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    provideAnimations(),
    // TODO: This solves provisional interceptor issue,
    // check for use of provideHttpClient withInterceptors() in the future
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(SocialLoginModule),
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          }
        ]
      } satisfies SocialAuthServiceConfig
    }
  ]
};
