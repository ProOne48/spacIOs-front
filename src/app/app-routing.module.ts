import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { ActiveSessionGuard } from '../services/auth/active-session.guard';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { SpaceComponent } from './space/space.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'space/:id',
        component: SpaceComponent
      },
      {
        path: 'space/:id/pdf',
        component: PdfViewComponent
      }
    ]
  },
  {
    path: '',
    component: AuthContainerComponent,
    canActivate: [ActiveSessionGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

const config: ExtraOptions = {};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
