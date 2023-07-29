import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-assign-work-centers-user-form',
  templateUrl: './assign-work-centers-user-form.component.html',
  styleUrls: ['./assign-work-centers-user-form.component.scss'],
})
export class AssignWorkCentersUserFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  public listCentrosCosto: any;
  toastr: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public genericService: GenericService,
    public dialogRef: MatDialogRef<AssignWorkCentersUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      User: [this.data.id, Validators.required],
      Workplace: ['', Validators.required],
    });
    this.genericService
      .GetAll('centrotrabajo/ConsultarCentroDeTrabajo')
      .subscribe((data) => (this.listCentrosCosto = data));
  }
  onSaveCentroTrabajo() {
    this.genericService
      .Post('userWorkPlace/RegistrarCentroDeTrabajoUsuario', this.form.value)
      .subscribe({
        next: (data) => {
          window.location.reload();
          this.toastr.success('Usuario Registrado, exitosamente!');
        },
        error: (error) => {
          console.log('error usuario' + error.error.message);
          this.toastr.error('Ha ocurrido un error! ' + error.error.message);
        },
      });
  }
}