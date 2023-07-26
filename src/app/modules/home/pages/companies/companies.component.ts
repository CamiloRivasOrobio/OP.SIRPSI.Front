import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UsersFormComponent } from '../users/users-form/users-form.component';
import { AssignWorkCentersFormComponent } from '../work-centers/assign-work-centers-form/assign-work-centers-form.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'empresas/ConsultarEmpresas';
  public nameEmpresa: any;
  public columns = [
    { name: 'Tipo documento', data: 'tipoDocNombre' },
    { name: 'Documento', data: 'documento' },
    { name: 'Digito verificación', data: 'digitoVerificacion' },
    { name: 'Tipo empresa', data: 'tipoEmpNombre' },
    { name: 'Nombre', data: 'nombre' },
    { name: 'Ministerio', data: 'ministerioNombre' },
    { name: 'Administrador', data: 'usuario', property: 'names' },
    { name: 'Estado', data: 'estadoNombre' },
  ];
  public options = [
    {
      delete: true,
      edit: true,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: true,
    },
  ];
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
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  OpenFormDialog(event: any) {
    const dialogRef = this.dialog.open(AssignWorkCentersFormComponent, {
      data: { id: event },
    });
    dialogRef.afterClosed().subscribe();
  }
  onAssignAdmin(item: any, table: number = 0) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: { id: 0, type: 1, item: item, reload: true, table: table },
    });
    dialogRef.afterClosed().subscribe();
  }
  SelectReservation(item: any) {
    this.nameEmpresa = item;
    console.log(item);
    this.genericService
      .GetAll(
        'centrotrabajo/ConsultarCentroDeTrabajo?PageNumber=1&PageSize=100000&companie=' +
          item.idConsecutivo
      )
      .subscribe((data: any) => {
        console.log(data);
        this.dataTable = data;
      });
  }
  openFormDialogUser() {
    // const dialogRef = this.dialog.open(UsersFormComponent, {
    //   data: { id: this.id, type: 0, reload: true },
    // });
    // dialogRef.afterClosed().subscribe();
  }
}
