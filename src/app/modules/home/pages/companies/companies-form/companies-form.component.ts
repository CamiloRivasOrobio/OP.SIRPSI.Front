import { Component, inject, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UsersFormComponent } from '../../users/users-form/users-form.component';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss'],
})
export class CompaniesFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  estadosList: any;
  listUsuario: any;
  listMinisterios: any;
  listDocs: any;
  listTipoEmpresa: any;
  id: number | undefined;
  type: number = this.data.type;
  table: number = this.data.table;
  listRoles: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<CompaniesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      TipoDocumento: ['', Validators.required],
      DigitoVerificacion: '',
      IdTipoEmpresa: ['', Validators.required],
      Documento: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Observacion: '',
      IdMinisterio: ['', Validators.required],
      IdEstado: ['', Validators.required],
      IdUsuario: '',
    });
  }
  onSave() {
    this.genericService
      .Post('empresas/RegistrarEmpresa', this.form.value)
      .subscribe({
        next: (data) => {
          if (this.data.reload) '';
          else this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Empresa, Registrado, exitosamente.',
            showConfirmButton: false,
            timer: 1300,
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
            timer: 1300,
          });
        },
      });
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('ministerio/ConsultarMinisterio')
      .subscribe((data: any) => {
        this.listMinisterios = data;
        this.genericService
          .GetAll('tipodocumento/ConsultarTipoDocumento')
          .subscribe((data: any) => {
            this.listDocs = data;
            this.genericService
              .GetAll('tiposempresa/ConsultarTipoEmpresa')
              .subscribe((data: any) => {
                this.listTipoEmpresa = data;
                this.genericService
                  .GetAll('estados/ConsultarEstados')
                  .subscribe((data: any) => {
                    this.estadosList = data;
                    this.genericService
                      .GetAll('usuario/ConsultarUsuarios')
                      .subscribe((data: any) => {
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
                          () => this.loadingService.ChangeStatusLoading(false),
                          500
                        );
                      });
                  });
              });
          });
      });
  }
  changeViewFormUser() {
    this.dialogRef.close();
    this.dialog
      .open(UsersFormComponent, { data: { id: 0, type: 0, reload: false } })
      .afterClosed()
      .subscribe();
  }
}
