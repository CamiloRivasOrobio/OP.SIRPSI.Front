import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bookings } from 'src/app/core/models/bookings/bookings';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { RegisterRoomComponent } from '../../pages/hotels/register-room/register-room.component';
import { RegisterComponent } from '../../pages/hotels/register/register.component';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.scss']
})
export class MyHotelsComponent implements OnInit {
  public seleted: number;
  public selectedRoom: any = null;
  public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'Hotels';
  public dataTable: any;
  public dataTableCosts: any = null;
  public dataTableBookings: Bookings[] | any = null;
  public columns = [
    { name: "Id", data: "id" },
    { name: "Hotel", data: "hotel" },
    { name: "Estrellas", data: "estrellas" },
    { name: "Ciudad", data: "ciudadNavigation", property: "ciudad" }];
  public options = [{ delete: true, edit: true, details: true, select: true, state: true }];

  public columnsRoom = [
    { name: "Id", data: "id" },
    { name: "Habitacion", data: "habitacion" },
    { name: "Piso", data: "piso" },
    { name: "Tipo", data: "tipoHabitacionNavigation", property: ["tipoHabitacion"] }];
  public optionsRoom = [{ delete: true, edit: true, details: true, select: true, state: true }];

  public columnsCost = [
    { name: "Id", data: "id" },
    { name: "Costo", data: "costo" },
    { name: "Extra", data: "extra" }];
  public optionsCost = [{ delete: true, edit: true, details: true, select: false, state: true }];

  public tableBookings: string = 'Bookings';
  public columnsBookings = [
    { name: "Factura", data: "id" },
    { name: "Cliente", data: "personaNavigation", property: "nombres" },
    { name: "Habitacion", data: "habitacionNavigation", property: "habitacion" },
    { name: "Contacto", data: "contactoEmergenciaNavigation", property: "nombres" },
    { name: "F. Inicio", data: "fechaInicio", pipeDate: 'YYYY/dd/MM' },
    { name: "F. Fin", data: "fechaFin", pipeDate: 'YYYY/dd/MM' },
    { name: "F. Registro", data: "feRegistro", pipeDate: 'YYYY/dd/MM' },
    { name: "Estado", data: 'estado', burnedData: { not: "sin confirmar.", yeah: "confirmada." }, pipeDate: 'YYYY/dd/MM' }];
  public optionsBookings = [{ delete: false, edit: false, details: true, select: true, state: true }];

  constructor(public genericService: GenericService, private router: Router, private accountService: AccountService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
  }

  OpenFormDialog(id: any, type: string, option: number) {
    this.loadingService.ChangeStatusLoading(true);
    if (option == 1)
      this.router.navigate(['/hotels/register/' + id + '/' + type]);
    if (option == 2)
      this.router.navigate(['/hotels/register-room/' + this.seleted + '/' + id + '/' + type]);
    if (option == 3)
      this.router.navigate(['/hotels/register-cost/' + this.selectedRoom + '/' + id + '/' + type]);
    if (option == 4)
      this.router.navigate(['/reservation/form/' + this.seleted + '/' + type]);
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
  }
  SelectHotel(id: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll("Rooms?PageNumber=1&PageSize=100000&Hotel=" + id).subscribe(data => {
      this.dataTable = data.data;
      this.seleted = id;
      this.selectedRoom = null;
      this.dataTableBookings = null;
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
    });
  }
  SelectRoom(id: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll("Costs?PageNumber=1&PageSize=100000&Habitacion=" + id).subscribe(data => {
      this.dataTableCosts = data.data;
      this.selectedRoom = id;
      this.LoadBookingsHotel(id);
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
    });
  }
  LoadBookingsHotel(id: number) {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll('Bookings?PageNumber=1&PageSize=100000&Habitacion=' + id).subscribe(resultBookings => {
      var bookings: Bookings[] = resultBookings.data;
      bookings.forEach(booking => {
        this.genericService.GetById('Persons', booking.usuario).subscribe(resultPerosons => {
          booking.personaNavigation = resultPerosons.data;
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1200);
        });
      });
      this.dataTableBookings = bookings;
    });
  }
}