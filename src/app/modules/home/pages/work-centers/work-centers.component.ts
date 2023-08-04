import { Component, OnInit } from '@angular/core';
import { UsersFormComponent } from '../users/users-form/users-form.component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-centers',
  templateUrl: './work-centers.component.html',
  styleUrls: ['./work-centers.component.scss'],
})
export class WorkCentersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  public nameWorkCenter: any;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'userWorkPlace/ConsultarCentroDeTrabajoUsuario';
  public filter: string = '&user=' + this.accountService.userData.id;
  public columnsWork = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Estado', data: 'estados', property: 'nombre' },
    { name: 'Psicologo', data: 'usuario', property: 'names' },
  ];
  public optionsWork = [
    {
      delete: false,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: false,
    },
  ];
  public columnsUsers = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'Documento', data: 'cedula' },
    { name: 'Correo', data: 'correo' },
    { name: 'Telefono', data: 'telefono' },
    { name: 'Nombre', data: 'nombreUsuario' },
    { name: 'Apellidos', data: 'apellidosUsuario' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public dataTableUsers: any = null;
  constructor(
    public genericService: GenericService,
    private router: Router,
    public accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  onAssignAdmin(
    item: any,
    table: number = 0,
    estado: number = 1,
    role: number = 1
  ) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: {
        id: 0,
        type: 1,
        item: item,
        reload: true,
        table: table,
        estado: estado,
        role: role,
        retornarModal: environment.retornarModal.asignarPsicologo,
        empresa: 1,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  SelectCentroTrabajo(item: any) {
    this.nameWorkCenter = item;
    console.log(item);
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarUsuariosCentroDeTrabajo?workCenter=' + item.id
      )
      .subscribe((data: any) => {
        this.dataTableUsers = data;
      });
  }
}
