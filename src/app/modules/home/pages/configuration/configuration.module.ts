import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RolesComponent } from './roles/roles.component';
import { RolesFormComponent } from './roles/roles-form/roles-form.component';
import { RoutesFormComponent } from './routes/routes-form/routes-form.component';
import { RoutesRoleComponent } from './routes-role/routes-role.component';


@NgModule({
  declarations: [
    RoutesComponent,
    RolesComponent,
    RolesFormComponent,
    RoutesFormComponent,
    RoutesRoleComponent,
    RoutesComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MatTabsModule,
    GenericTableModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class ConfigurationModule { }
