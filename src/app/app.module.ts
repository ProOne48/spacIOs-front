import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarItemComponent } from './navbar/navbar-item/navbar-item.component';
import { AuthGuard } from "../services/auth/auth.guard";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { environment } from "../environments/environment";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../services/auth/auth.interceptor";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { FooterComponent } from './footer/footer.component';

export const materialImports = [
  MatToolbarModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    NavbarItemComponent,
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ...materialImports],
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
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
