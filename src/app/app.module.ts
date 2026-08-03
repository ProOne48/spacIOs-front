// TODO: Remove this whole module as standole not use it anymore

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { environment } from '../environments/environment';
import { AuthGuard } from '../services/auth/auth.guard';
import { AuthInterceptor } from '../services/auth/auth.interceptor';

import { AppComponent } from './app.component';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { LoginComponent } from './auth-container/login/login.component';
import { BoardInfoModalComponent } from './board-info-modal/board-info-modal.component';
import { BoardsTableComponent } from './boards-table/boards-table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { PdfFormModalComponent } from './pdf-form-modal/pdf-form-modal.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { QrModalComponent } from './qr-modal/qr-modal.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { NavbarItemComponent } from './shared-components/navbar/navbar-item/navbar-item.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { SpaceInfoModalComponent } from './space/space-info-modal/space-info-modal.component';
import { SpaceItemComponent } from './space/space-list/space-item/space-item.component';
import { SpaceListComponent } from './space/space-list/space-list.component';
import { SpaceReducedInfoComponent } from './space/space-reduced-info/space-reduced-info.component';
import { SpaceComponent } from './space/space.component';
import { SpacesGridComponent } from './space/spaces-grid/spaces-grid.component';
import { StatisticsChartComponent } from './statistics-chart/statistics-chart.component';

const appImports = [
  // Material Imports
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
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatMenuModule,

  // Add other Angular Material modules here
  BaseChartDirective,
  BrowserAnimationsModule,
  CommonModule,
  HttpClientModule,
  FormsModule,
  GoogleSigninButtonModule,
  SocialLoginModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  NgxExtendedPdfViewerModule,
  NgOptimizedImage,
  NgxSkeletonLoaderModule,
  // Components imports

  StatisticsChartComponent,
  SpacesGridComponent,
  SpaceComponent,
  BoardsTableComponent,
  SpaceReducedInfoComponent,
  SpaceListComponent,
  SpaceItemComponent,
  SpaceInfoModalComponent,
  MainComponent,
  BoardInfoModalComponent,
  NavbarComponent,
  FooterComponent,
  NavbarItemComponent,
  HomeComponent,
  GeneralDialogComponent,
  ConfirmDialogComponent,
  LoginComponent,
  AuthContainerComponent,
  QrModalComponent,
  PdfViewComponent,
  PdfFormModalComponent,
  AppComponent
];

@NgModule({
  declarations: [],
  imports: [...appImports],
  providers: [
    AuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideCharts(withDefaultRegisterables()),
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
