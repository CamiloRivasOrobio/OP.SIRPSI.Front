import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bookings } from 'src/app/core/models/bookings/bookings';
import { Rooms } from 'src/app/core/models/rooms/rooms';
import { AccountService } from 'src/app/shared/services/account.service';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  public reserva: Bookings | any = null;
  public name: string =
    this.accountService.userData.user.names +
    ' ' +
    this.accountService.userData.user.surnames;
  public text: string = '';
  public type: any = this.rutaActiva.snapshot.params['option'];
  public dataTable: Bookings | any = [];
  public dataTablePersonas: Bookings | any = [];
  public columns = [
    { name: 'Factura', data: 'id' },
    {
      name: 'Habitacion',
      data: 'habitacionNavigation',
      property: 'habitacion',
    },
    {
      name: 'Contacto',
      data: 'contactoEmergenciaNavigation',
      property: 'nombres',
    },
    { name: 'F. Inicio', data: 'fechaInicio', pipeDate: 'YYYY/dd/MM' },
    { name: 'F. Fin', data: 'fechaFin', pipeDate: 'YYYY/dd/MM' },
    { name: 'F. Registro', data: 'feRegistro', pipeDate: 'YYYY/dd/MM' },
    {
      name: 'Estado',
      data: 'estado',
      burnedData: { not: 'sin confirmar.', yeah: 'confirmada.' },
      pipeDate: 'YYYY/dd/MM',
    },
  ];

  public columnsPersons = [
    { name: 'Id', data: 'id' },
    { name: 'Huesped', data: 'personaNavigation', property: 'nombres' },
    {
      name: 'Documento',
      data: 'personaNavigation',
      property: 'numeroDocumento',
    },
    {
      name: 'Telefono',
      data: 'personaNavigation',
      property: 'telefonoContacto',
    },
  ];

  constructor(
    public genericService: GenericService,
    public rutaActiva: ActivatedRoute,
    public exportService: ExportService,
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.LoadData();
  }

  LoadData() {
    this.loadingService.ChangeStatusLoading(true);
    var id = this.rutaActiva.snapshot.params['id'];
    // Cargar datos del encabezado
    this.genericService.GetById('Bookings', id).subscribe((resultRoom) => {
      this.genericService
        .GetAll('Bills?Reserva=' + id)
        .subscribe((resultBills) => {
          this.genericService
            .GetById('Hotels', resultRoom.data.habitacionNavigation.hotel)
            .subscribe((resultHotels) => {
              this.genericService
                .GetById(
                  'RoomTypes',
                  resultRoom.data.habitacionNavigation.tipoHabitacion
                )
                .subscribe((resultRoomTypes) => {
                  this.reserva = resultRoom.data;
                  this.reserva.factura = resultBills.data[0];
                  this.reserva.habitacionNavigation.hotelNavigation =
                    resultHotels.data;
                  this.reserva.habitacionNavigation.tipoHabitacionNavigation =
                    resultRoomTypes.data;
                  this.text =
                    resultRoom.data.estado != 0
                      ? 'Tu reserva aun no ha sido confirmada.'
                      : 'Tu reserva ha sido confirmada.';
                  this.dataTable.push(this.reserva);
                  this.genericService
                    .GetAll(
                      'BookingPersons?PageNumber=1&PageSize=100000&Reserva=' +
                        id
                    )
                    .subscribe((persons) => {
                      this.dataTablePersonas = persons.data;
                    });
                  setTimeout(
                    () => this.loadingService.ChangeStatusLoading(false),
                    500
                  );
                });
            });
        });
    });
  }
  DownloadInvoice() {
    this.loadingService.ChangeStatusLoading(true);
    const html = document.getElementById('wrapperFac');
    this.exportService.DownloadPdfFromHTML(html);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
