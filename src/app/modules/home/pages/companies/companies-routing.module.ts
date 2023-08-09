import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CompaniesUserComponent } from './companies-user/companies-user.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';

const routes: Routes = [
  {
    path: 'list-companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companies-user',
    component: CompaniesUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
