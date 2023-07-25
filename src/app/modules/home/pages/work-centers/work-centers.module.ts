import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkCentersRoutingModule } from './work-centers-routing.module';
import { WorkCentersComponent } from './work-centers.component';

@NgModule({
  declarations: [WorkCentersComponent],
  imports: [CommonModule, WorkCentersRoutingModule],
})
export class WorkCentersModule {}
