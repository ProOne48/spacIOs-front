import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
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
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const materialImports = [
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
  MatMenuModule
] as const;

const globalImports = [
  BaseChartDirective,
  CommonModule,
  FormsModule,
  GoogleSigninButtonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  NgxExtendedPdfViewerModule,
  NgOptimizedImage,
  NgxSkeletonLoaderModule
] as const;
