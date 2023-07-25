import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingPersons } from 'src/app/core/models/bookingPersons/bookingPersons';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  public seleted: number;
  public selectedRoom: any = null;
  public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'Bookings';
  public dataTable: BookingPersons | any = null;
  public columns = [
    { name: "Factura", data: "id" },
    { name: "Habitacion", data: "habitacionNavigation", property: "habitacion" },
    { name: "Contacto", data: "contactoEmergenciaNavigation", property: "nombres" },
    { name: "F. Inicio", data: "fechaInicio", pipeDate: 'YYYY/dd/MM' },
    { name: "F. Fin", data: "fechaFin", pipeDate: 'YYYY/dd/MM' },
    { name: "Estado", data: 'estado', burnedData: { not: "sin confirmar.", yeah: "confirmada." }, pipeDate: 'YYYY/dd/MM' }];
  public options = [{ delete: false, edit: false, details: true, select: true, state: false, pdf: true, validationSelect: false }];

  public columnsPersons = [
    { name: "Id", data: "id" },
    { name: "Huesped", data: "personaNavigation", property: "nombres" },
    { name: "Documento", data: "personaNavigation", property: "numeroDocumento" },
    { name: "Telefono", data: "personaNavigation", property: "telefonoContacto" }];

  constructor(public genericService: GenericService, private router: Router, private accountService: AccountService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  OpenFormDialog(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'view']);
  }
  DownloadPDF(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'download']);
  }
  SelectReservation(id: any) {
    this.genericService.GetAll("BookingPersons?PageNumber=1&PageSize=100000&Reserva=" + id).subscribe(data => {
      this.dataTable = data.data;
    });
  }
}