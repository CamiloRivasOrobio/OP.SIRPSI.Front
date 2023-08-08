import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bills } from 'src/app/core/models/bills/bills';
import { BookingPersonsRequest } from 'src/app/core/models/bookingPersons/bookingPersonsRequest';
import { Bookings } from 'src/app/core/models/bookings/bookings';
import { Cities } from 'src/app/core/models/cities/cities';
import { Costs } from 'src/app/core/models/costs/costs';
import { DocumentTypes } from 'src/app/core/models/documentTypes/document-types';
import { EmergencyContacts } from 'src/app/core/models/emergencyContacts/EmergencyContacts';
import { Genders } from 'src/app/core/models/genders/genders';
import { Hotels } from 'src/app/core/models/hotels/hotels';
import { Images } from 'src/app/core/models/images/images';
import { PaymentMethods } from 'src/app/core/models/paymentMethods/paymentMethods';
import { Persons } from 'src/app/core/models/persons/persons';
import { Rooms } from 'src/app/core/models/rooms/rooms';
import { RoomTypes } from 'src/app/core/models/roomTypes/room-types';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  public habitacion: Rooms;
  public tipoHabitacion: RoomTypes[];
  public imagen: Images[];
  public firstForm: FormGroup;
  public secondForm: FormGroup;
  public thirdForm: FormGroup;
  public fourthForm: FormGroup;
  public id: number = this.rutaActiva.snapshot.params['room'];
  public costos: Costs[];
  public metodosPago: PaymentMethods[];
  public fechaIni: any;
  public fechaFin: any;
  public documentTypes: DocumentTypes[];
  public genders: Genders[];
  public countGuest: number = 0;
  constructor(
    private genericService: GenericService,
    public formBuilder: FormBuilder,
    public rutaActiva: ActivatedRoute,
    private datePipe: DatePipe,
    public router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.fechaIni = this.datePipe.transform(
      this.rutaActiva.snapshot.params['fechaIni'],
      'yyyy-MM-dd'
    );
    this.fechaFin = this.datePipe.transform(
      this.rutaActiva.snapshot.params['fechaFin'],
      'yyyy-MM-dd'
    );
    var dias =
      (new Date(this.fechaFin).getTime() - new Date(this.fechaIni).getTime()) /
      1000 /
      60 /
      60 /
      24;
    this.firstForm = this.formBuilder.group({
      ciudad: [
        parseInt(this.rutaActiva.snapshot.params['ciudad']),
        Validators.required,
      ],
      fechaInicio: [this.fechaIni, Validators.required],
      fechaFin: [this.fechaFin, Validators.required],
      personas: [
        this.rutaActiva.snapshot.params['personas'],
        Validators.required,
      ],
      dias: dias,
      hotel: null,
      precio: 0,
    });
    this.secondForm = this.formBuilder.group({
      id: 0,
      usuario: 0,
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: [0, Validators.required],
      tipoDocumento: [0, Validators.required],
      numeroDocumento: ['', Validators.required],
      email: '',
      telefonoContacto: 0,
    });
    this.thirdForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroContacto: ['', Validators.required],
      email: '',
    });
    this.fourthForm = this.formBuilder.group({
      metodoPago: ['', Validators.required],
    });
    this.LoadData();
  }

  LoadData() {
    this.genericService
      .GetAll('DocumentTypes')
      .subscribe((dataDocumentTypes) => {
        this.genericService.GetAll('Genders').subscribe((dataGenders) => {
          this.genericService
            .GetAll('PaymentMethods')
            .subscribe((dataPaymentMethods) => {
              this.genericService
                .GetById('Rooms', this.id)
                .subscribe((dataRooms) => {
                  this.documentTypes = dataDocumentTypes.data;
                  this.genders = dataGenders.data;
                  this.metodosPago = dataPaymentMethods.data;
                  this.costos = dataRooms.data.costos;
                  var suma = 0;
                  this.costos.forEach((costo) => {
                    var sum = costo.costo + costo.extra;
                    suma +=
                      sum +
                      (sum * costo.impuestos) / 100 +
                      (sum * costo.porcPromocion) / 100;
                  });
                  dataRooms.data.price = suma;
                  this.habitacion = dataRooms.data;
                  this.firstForm.controls['precio'].setValue(
                    this.firstForm.value.dias * this.habitacion.price
                  );
                  setTimeout(
                    () => this.loadingService.ChangeStatusLoading(false),
                    300
                  );
                });
            });
        });
      });
  }
  Cancel() {
    this.router.navigate(['search-bedroom']);
  }
  SaveGuest() {
    if (this.countGuest < this.firstForm.value.personas) {
      localStorage.setItem(
        'Guest' + this.countGuest,
        JSON.stringify(this.secondForm.value)
      );
      this.countGuest++;
      this.secondForm.reset();
    }
  }
  CreateReservation() {
    this.loadingService.ChangeStatusLoading(true);
    // Insert emergency contact
    var contact: EmergencyContacts | any = {
      id: 0,
      nombres: this.thirdForm.value.nombres,
      apellidos: this.thirdForm.value.apellidos,
      numeroContacto: this.thirdForm.value.numeroContacto,
      email: this.thirdForm.value.email,
    };
    this.genericService
      .Post('EmergencyContacts', contact)
      .subscribe((resultContact) => {
        // Insert bookings
        var booking: Bookings | any = {
          id: 0,
          usuario: this.accountService.userData.id,
          estado: 1,
          fechaInicio: this.fechaIni,
          fechaFin: this.fechaFin,
          contactoEmergencia: resultContact.data,
          habitacion: parseInt(this.rutaActiva.snapshot.params['room'], 10),
          numeroPersonas: parseInt(this.firstForm.value.personas, 10),
          precioFinal: parseInt(this.firstForm.value.precio, 10),
        };
        this.genericService
          .Post('Bookings', booking)
          .subscribe((resultBooking) => {
            // Insert bill
            var bill: Bills | any = {
              id: 0,
              reserva: resultBooking.data,
              metodoPago: this.fourthForm.value.metodoPago,
              estado: 1,
              fechaCreacionFactura: new Date(
                this.fechaIni[0],
                this.fechaIni[1],
                this.fechaIni[2]
              ),
              fechaCancelacionFactura: null,
            };
            this.genericService.Post('Bills', bill).subscribe((resulBill) => {
              // Send email
              var emailRequest: any = {
                email: this.accountService.userData.user.email,
                tipo: '1',
                origen: 'Reservas',
                idReserva: resultBooking.data,
                nombreCompleto:
                  this.accountService.userData.user.names +
                  ' ' +
                  this.accountService.userData.user.surnames,
              };
              this.genericService
                .Post('Emails/Send', emailRequest)
                .subscribe((result) => {
                  // Insert guests
                  for (let i = 0; i < this.countGuest; i++) {
                    var person: Persons = JSON.parse(localStorage['Guest' + i]);
                    person.id = person.id == null ? 0 : person.id;
                    person.email = person.email == null ? '' : person.email;
                    person.telefonoContacto =
                      person.telefonoContacto == null
                        ? 0
                        : person.telefonoContacto;
                    person.usuario =
                      person.usuario == null ? 0 : person.usuario;
                    this.genericService
                      .Post('Persons', person)
                      .subscribe((personData) => {
                        // Insert guest to reservation
                        var bookingPerson: BookingPersonsRequest = {
                          id: 0,
                          reserva: resultBooking.data,
                          persona: personData.data,
                        };
                        this.genericService
                          .Post('BookingPersons', bookingPerson)
                          .subscribe((bookingPersonData) => {
                            console.log(bookingPersonData.succeeded);
                          });
                      });
                  }
                  setTimeout(
                    () => this.loadingService.ChangeStatusLoading(false),
                    400
                  );
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha registrado la reserva exitosamente.',
                    showConfirmButton: false,
                    timer: 2800,
                  }).then(() =>
                    this.router.navigate([
                      'reservation/form/' + resultBooking.data + '/view',
                    ])
                  );
                });
            });
          });
      });
  }
}
