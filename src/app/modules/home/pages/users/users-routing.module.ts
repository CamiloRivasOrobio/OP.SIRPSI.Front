import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersCompanyComponent } from './users-company/users-company.component';

const routes: Routes = [
  { path: 'list-users', component: UsersComponent },
  { path: 'users-company', component: UsersCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
