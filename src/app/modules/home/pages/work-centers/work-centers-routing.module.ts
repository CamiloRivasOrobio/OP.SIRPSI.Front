import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkCentersComponent } from './work-centers.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';

const routes: Routes = [
  { path: '', component: WorkCentersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkCentersRoutingModule {}
