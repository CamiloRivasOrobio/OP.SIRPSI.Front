import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { CompaniesFormComponent } from '../companies/companies-form/companies-form.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  openFormDialogUser() {
    const dialogRef = this.dialog.open(CompaniesFormComponent, {
      data: { id: 0, type: 0, reload: true, table: 0 },
    });
    dialogRef.afterClosed().subscribe();
  }
}
