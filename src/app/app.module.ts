import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthInterceptor } from '../services/auth/auth.interceptor';
import { BoardInfoModalComponent } from './board-info-modal/board-info-modal.component';
import { BoardsTableComponent } from './boards-table/boards-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MainComponent } from './main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { NavbarItemComponent } from './shared-components/navbar/navbar-item/navbar-item.component';
import { NgChartsModule } from 'ng2-charts';
import { NgOptimizedImage } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OverviewComponent } from './overview/overview.component';
import { PdfFormModalComponent } from './pdf-form-modal/pdf-form-modal.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { QrModalComponent } from './qr-modal/qr-modal.component';
import { RouterModule } from '@angular/router';
import { SpaceComponent } from './space/space.component';
import { SpaceInfoModalComponent } from './space/space-info-modal/space-info-modal.component';
import { SpaceItemComponent } from './space/space-list/space-item/space-item.component';
import { SpaceListComponent } from './space/space-list/space-list.component';
import { SpacesGridComponent } from './space/spaces-grid/spaces-grid.component';
import { StatisticsChartComponent } from './statistics-chart/statistics-chart.component';
import { environment } from '../environments/environment';

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
  MatInputModule,
  MatGridListModule,
  MatDividerModule,
  MatCheckboxModule
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
  RouterModule,
  NgxExtendedPdfViewerModule,
  NgChartsModule
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
    BoardInfoModalComponent,
    PdfFormModalComponent,
    PdfViewComponent,
    QrModalComponent,
    OverviewComponent,
    SpaceItemComponent,
    SpaceListComponent,
    NavbarItemComponent,
    StatisticsChartComponent
  ],
  imports: [...globalImports, ...materialImports, NgOptimizedImage, MatTooltipModule],
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NgChartsModule, useValue: { generateColors: true } },
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
