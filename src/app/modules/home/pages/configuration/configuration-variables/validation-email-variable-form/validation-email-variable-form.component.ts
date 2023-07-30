import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation-email-variable-form',
  templateUrl: './validation-email-variable-form.component.html',
  styleUrls: ['./validation-email-variable-form.component.scss'],
})
export class ValidationEmailVariableFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  public listRoles: any;
  id: number | undefined;
  type: number = this.data.type;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<ValidationEmailVariableFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: '0',
      Descripcion: '',
      Nombre: ['', Validators.required],
      Modulo: 'Users',
      Variable1: 'ValidacionMinisterio',
      Variable2: '',
      Variable3: '',
      Variable4: '',
    });
    this.getListas();
  }
  onSave() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('variables/RegistrarVariables', this.form.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Variable Registrado, exitosamente.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          console.log('error variable ' + error.error.message);
          Swal.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error! ' + error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
  }
  changeViewFormUser() {
    this.type = 1;
    this.dialogRef.close();
    this.dialog
      .open(ValidationEmailVariableFormComponent, {
        data: { id: 0, type: 0, reload: false },
      })
      .afterClosed()
      .subscribe();
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('roles/ConsultarRoles')
      .subscribe((data: any) => {
        this.listRoles = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  onUpdateEmpresa() {
    // if (this.table == 0) {
    //   var empresa = this.data.item;
    //   empresa.IdUsuario = this.formEmpresa.value.Usuario;
    //   this._empresas.updateEmpresa(empresa).subscribe({
    //     next: (data) => {
    //       window.location.reload();
    //       this.toastr.success('Usuario asignado exitosamente!');
    //     },
    //     error: (error) => {
    //       console.log('error usuario' + error.error.message);
    //       this.toastr.error('Ha ocurrido un error! ' + error.error.message);
    //     },
    //   });
    // } else {
    //   var centroTrabajo = this.data.item;
    //   centroTrabajo.IdUsuario = this.formEmpresa.value.Usuario;
    //   console.log(this.data.item);
    //   console.log(this.formEmpresa.value.Usuario);
    //   this._centroTrabajo.updateCentroTrabajo(centroTrabajo).subscribe({
    //     next: (data) => {
    //       window.location.reload();
    //       this.toastr.success('Usuario asignado exitosamente!');
    //     },
    //     error: (error) => {
    //       console.log('error usuario' + error.error.message);
    //       this.toastr.error('Ha ocurrido un error! ' + error.error.message);
    //     },
    //   });
    // }
  }
}
