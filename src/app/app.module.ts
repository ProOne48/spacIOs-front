import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthInterceptor } from '../services/auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MainComponent } from './main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import {provideRouter, RouterModule} from '@angular/router';
import { SpaceInfoModalComponent } from './space-info-modal/space-info-modal.component';
import { SpaceComponent } from './space/space.component';
import { SpacesGridComponent } from './spaces-grid/spaces-grid.component';
import { environment } from '../environments/environment';
import { BoardsTableComponent } from './boards-table/boards-table.component';
import { BoardInfoModalComponent } from './board-info-modal/board-info-modal.component';
import {MatGridListModule} from "@angular/material/grid-list";

export const materialImports = [
  MatToolbarModule,
  MatSnackBarModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatInputModule
];

export const globalImports = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  GoogleSigninButtonModule,
  SocialLoginModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    AuthContainerComponent,
    HomeComponent,
    SpacesGridComponent,
    SpaceComponent,
    SpaceInfoModalComponent,
    BoardsTableComponent,
    BoardInfoModalComponent
  ],
  imports: [...globalImports, ...materialImports, MatGridListModule],
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
