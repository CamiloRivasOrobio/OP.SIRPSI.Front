import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./modules/home/pages/welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/home/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/home/pages/users/users.module').then(
        (m) => m.UsersModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/home/pages/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'work-centers',
    loadChildren: () =>
      import('./modules/home/pages/work-centers/work-centers.module').then(
        (m) => m.WorkCentersModule
      ),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./modules/home/pages/companies/companies.module').then(
        (m) => m.CompaniesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./modules/home/pages/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
