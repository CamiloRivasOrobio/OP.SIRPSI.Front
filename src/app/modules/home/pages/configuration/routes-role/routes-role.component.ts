import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-routes-role',
  templateUrl: './routes-role.component.html',
  styleUrls: ['./routes-role.component.scss'],
})
export class RoutesRoleComponent {
  id: string | undefined;
  public rolesList: any;
  public routesList: any;
  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.LoadLists();
  }

  LoadLists() {
    this.genericService
      .GetAll('roles/ConsultarRoles')
      .subscribe((data: any) => {
        this.rolesList = data;
        this.genericService
          .GetAll('modulos/ConsultarModulos')
          .subscribe((data: any) => {
            this.routesList = data;
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              500
            );
          });
      });
  }
  SelectedItem(role: string, modulo: string, event: any) {
    if (event.checked) {
      let body = {
        RoleId: role,
        ModuloId: modulo,
      };
      this.genericService
        .Post('modulosUserRole/RegistrarModulosRole', body)
        .subscribe((data: any) => {
          console.log(data);
        });
    }
  }
}
