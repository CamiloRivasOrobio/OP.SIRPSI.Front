import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordProfileComponent } from './change-password-profile/change-password-profile.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';

const routes: Routes = [
  {
    path: 'changePassword',
    component: ChangePasswordProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
