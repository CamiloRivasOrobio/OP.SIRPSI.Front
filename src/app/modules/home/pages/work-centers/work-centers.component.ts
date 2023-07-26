import { Component, OnInit } from '@angular/core';
import { UsersFormComponent } from '../users/users-form/users-form.component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-centers',
  templateUrl: './work-centers.component.html',
  styleUrls: ['./work-centers.component.scss'],
})
export class WorkCentersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
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
      delete: true,
      edit: false,
      details: false,
      select: false,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: true,
    },
  ];
  public dataTable: any = null;
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

  onAssignAdmin(item: any, table: number = 0) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: { id: 0, type: 1, item: item, reload: true, table: table },
    });
    dialogRef.afterClosed().subscribe();
  }
}
