import { Component, inject, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  public form: FormGroup;
  public formEmpresa: FormGroup;
  public option: string;
  public listCentrosCosto: any;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  id: number | undefined;
  type: number = this.data.type;
  table: number = this.data.table;
  listRoles: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: ['', Validators.required],
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: ['', Validators.required],
      Password: ['', Validators.required],
      PhoneNumber: '',
      Email: ['', Validators.required],
      IdEstado: ['', Validators.required],
    });
    this.formEmpresa = this.formBuilder.group({
      Usuario: ['', Validators.required],
    });
    this.genericService
      .GetAll('centrotrabajo/ConsultarCentroDeTrabajo')
      .subscribe((data) => (this.listCentrosCosto = data));
  }
  onSave() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegisterUser', this.form.value).subscribe({
      next: (data) => {
        if (this.data.reload) '';
        else this.dialogRef.close();
        console.log(data);
        if (data.estadoId == environment.inactivoEstado)
          this.sendNotifications(
            data.user.codeActivation,
            data.user.phoneNumber
          );
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado, exitosamente.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      },
      error: (error) => {
        Swal.fire({
          icon: 'warning',
          title:
            'Ha ocurrido un error! ' + error.error.message ==
            'Registro de usuario ¡fallido!  Failed : PasswordRequiresNonAlphanumeric,PasswordRequiresLower,PasswordRequiresUpper'
              ? 'Registro de usuario ¡fallido!  Error: La contraseña no cumple los criterios de seguridad.'
              : error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('empresas/ConsultarEmpresas')
      .subscribe((data: any) => {
        this.listEmpresas = data;
        this.genericService
          .GetAll('tipodocumento/ConsultarTipoDocumento')
          .subscribe((data: any) => {
            this.listDocs = data;
            this.genericService
              .GetAll('pais/ConsultarPaises')
              .subscribe((data: any) => {
                this.listPaises = data;
                this.genericService
                  .GetAll('roles/ConsultarRoles')
                  .subscribe((data: any) => {
                    this.listRoles = data;
                    this.genericService
                      .GetAll('estados/ConsultarEstados')
                      .subscribe((data: any) => {
                        this.estadosList = data;
                        this.genericService
                          .GetAll('usuario/ConsultarUsuarios')
                          .subscribe((data: any) => {
                            console.log(data);
                            this.listUsuario = data.filter(
                              (data: any) =>
                                data.idRol ==
                                (this.data.table == 0
                                  ? environment.adminitradorEmpRole
                                  : this.data.table == 1
                                  ? environment.psicologoRole
                                  : environment.trabajadorRole)
                            );
                            setTimeout(
                              () =>
                                this.loadingService.ChangeStatusLoading(false),
                              500
                            );
                          });
                      });
                  });
              });
          });
      });
  }
  changeViewFormUser() {
    this.type = 1;
    this.dialogRef.close();
    this.dialog
      .open(UsersFormComponent, { data: { id: 0, type: 0, reload: false } })
      .afterClosed()
      .subscribe();
  }
  onUpdateEmpresa() {
    if (this.table == 0) {
      var empresa = this.data.item;
      empresa.IdUsuario = this.formEmpresa.value.Usuario;
      this.genericService.Put('empresas/ActualizarEmpresa', empresa).subscribe({
        next: (data) => {
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Usuario asignado exitosamente.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          Swal.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error! ' + error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      var centroTrabajo = this.data.item;
      centroTrabajo.IdUsuario = this.formEmpresa.value.Usuario;
      this.genericService
        .Put('centrotrabajo/ActualizarCentroDeTrabajo', centroTrabajo)
        .subscribe({
          next: (data) => {
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: 'Usuario asignado exitosamente.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => window.location.reload());
          },
          error: (error) => {
            Swal.fire({
              icon: 'warning',
              title: 'Ha ocurrido un error! ' + error.error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
    }
  }
  sendNotifications(code: string, numberPhone: string) {
    var body = {
      MessageCodeActivation: code,
      MessageReceiver: numberPhone,
    };
    console.log(body);
    this.genericService
      .Post('mensajes/EnviarNotificaciónMensajeWhatsApp', body)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
