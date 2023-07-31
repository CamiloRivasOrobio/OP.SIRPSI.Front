import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
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

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    WelcomeRoutingModule,
    MatDividerModule,
    MatDialogModule,
    GenericTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
  ],
})
export class WelcomeModule {}
