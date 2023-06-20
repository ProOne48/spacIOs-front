import { RouterModule, Routes } from '@angular/router';
import { ActiveSessionGuard } from '../services/auth/active-session.guard';
import { AuthGuard } from '../services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: []
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [ActiveSessionGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
