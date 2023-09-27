import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth-container/login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { SpaceComponent } from './space/space.component';
import { SpaceListComponent } from './space/space-list/space-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
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
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'public/space',
        component: SpaceListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
