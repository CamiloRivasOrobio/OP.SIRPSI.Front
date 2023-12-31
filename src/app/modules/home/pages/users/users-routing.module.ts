import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersCompanyComponent } from './users-company/users-company.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';

const routes: Routes = [
  { path: 'list-users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'users-company',
    component: UsersCompanyComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
