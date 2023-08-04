import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CompaniesUserComponent } from './companies-user/companies-user.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'companies-user', component: CompaniesUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
