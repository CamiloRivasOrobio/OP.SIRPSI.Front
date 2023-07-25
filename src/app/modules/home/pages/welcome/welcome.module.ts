import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    WelcomeRoutingModule,
    MatDividerModule,
  ],
})
export class WelcomeModule {}
