import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkCentersRoutingModule } from './work-centers-routing.module';
import { WorkCentersComponent } from './work-centers.component';
import { WorkCentersFormComponent } from './work-centers-form/work-centers-form.component';
import { AssignWorkCentersFormComponent } from './assign-work-centers-form/assign-work-centers-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { AssignWorkCentersUserFormComponent } from './assign-work-centers-user-form/assign-work-centers-user-form.component';

@NgModule({
  declarations: [
    WorkCentersComponent,
    WorkCentersFormComponent,
    AssignWorkCentersFormComponent,
    AssignWorkCentersUserFormComponent,
  ],
  imports: [
    CommonModule,
    WorkCentersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSnackBarModule,
    GenericTableModule,
    FileUploadModule,
  ],
})
export class WorkCentersModule {}
