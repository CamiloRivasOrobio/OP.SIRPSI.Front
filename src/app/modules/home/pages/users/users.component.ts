import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UsersFormComponent } from './users-form/users-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'usuario/ConsultarUsuarios';
  public columns = [
    { name: 'Tipo documento', data: 'nombreTipoDocumento' },
    { name: 'Cédula', data: 'cedula' },
    { name: 'Correo', data: 'correo' },
    { name: 'Telefono', data: 'telefono' },
    { name: 'Empresa', data: 'nombreEmpresa' },
    { name: 'Nombre', data: 'nombreUsuario' },
    { name: 'Apellidos', data: 'apellidosUsuario' },
    { name: 'Estado', data: 'nombreEstado' },
  ];
  public options = [
    {
      delete: true,
      edit: true,
      details: true,
      select: true,
      state: true,
      pdf: true,
      validationSelect: true,
    },
  ];

  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  OpenFormDialog(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'view']);
  }
  DownloadPDF(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'download']);
  }
  SelectReservation(id: any) {
    this.genericService
      .GetAll('BookingPersons?PageNumber=1&PageSize=100000&Reserva=' + id)
      .subscribe((data: any) => {
        // this.dataTable = data.data;
      });
  }
  openFormDialogUser() {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: { id: this.id, type: 0, reload: true },
    });
    dialogRef.afterClosed().subscribe();
  }
}
