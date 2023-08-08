import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { CompaniesFormComponent } from '../companies/companies-form/companies-form.component';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

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
    Swal.fire({
      title: 'Información importante',
      text:
        'Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar' +
        'con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al' +
        'administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo ' +
        'principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar ' +
        'uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a ' +
        'través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para ' +
        'facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ' +
        'ellos en el siguiente enlace: [link]. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(CompaniesFormComponent, {
          data: {
            id: 0,
            type: 0,
            reload: true,
            table: 0,
            estado: environment.activoEstado,
            role: 2,
            retornarModal: environment.retornarModal.registrarAdmin,
          },
        });
        dialogRef.afterClosed().subscribe();
      }
    });
  }
}
