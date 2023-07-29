import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsConditionsModule } from '../../components/terms-conditions/terms-conditions.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RestorePasswordComponent,
    SelectRoleComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    TermsConditionsModule
  ]
})
export class AccountModule { }
