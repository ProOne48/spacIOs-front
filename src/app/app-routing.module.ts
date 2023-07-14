import { RouterModule, Routes } from '@angular/router';

import { ActiveSessionGuard } from '../services/auth/active-session.guard';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { SpacesTableComponent } from './spaces-table/spaces-table.component';
import { SpacesComponent } from './spaces/spaces.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'spaces',
        component: SpacesComponent
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
