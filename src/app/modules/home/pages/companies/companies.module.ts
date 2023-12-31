import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from '../companies/companies.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { CompaniesFormComponent } from './companies-form/companies-form.component';
import { CompaniesUserComponent } from './companies-user/companies-user.component';

@NgModule({
  declarations: [CompaniesComponent, CompaniesFormComponent, CompaniesUserComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
  ],
})
export class CompaniesModule {}
