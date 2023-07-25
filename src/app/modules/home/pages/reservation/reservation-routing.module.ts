import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationComponent } from './reservation.component';

const routes: Routes = [
  {
    path: 'my-reservations',
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form/:id/:option',
    component: ReservationFormComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
