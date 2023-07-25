import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cities } from 'src/app/core/models/cities/cities';
import { Costs } from 'src/app/core/models/costs/costs';
import { Hotels } from 'src/app/core/models/hotels/hotels';
import { Images } from 'src/app/core/models/images/images';
import { Rooms } from 'src/app/core/models/rooms/rooms';
import { RoomTypes } from 'src/app/core/models/roomTypes/room-types';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public habitacion: Rooms[];
  public tipoHabitacion: RoomTypes[];
  public imagen: Images[];
  public form: FormGroup;
  public ciudades: Cities[];
  public hoteles: Hotels[];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  public data: Rooms[] = [];
  constructor(public genericService: GenericService, public formBuilder: FormBuilder, public rutaActiva: ActivatedRoute, private datePipe: DatePipe,
    private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.form = this.formBuilder.group({
      ciudad: [parseInt(this.rutaActiva.snapshot.params['ciudad']), Validators.required],
      fechaInicio: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd'), Validators.required],
      fechaFin: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd'), Validators.required],
      personas: [this.rutaActiva.snapshot.params['personas'], Validators.required],
      estrellas: this.rutaActiva.snapshot.params['estrellas'],
      hotel: this.rutaActiva.snapshot.params['hotel'],
    });
    this.LoadData();
  }

  LoadData() {
    var filter = "&Ciudad=" + this.form.value.ciudad + "&Personas=" + this.form.value.personas + "&Estrellas=" + this.form.value.estrellas +
      "&Hotel=" + this.form.value.hotel + "&FechaInicio=" + this.datePipe.transform(this.form.value.fechaInicio, 'yyyy-MM-dd') +
      "&FechaFin=" + this.datePipe.transform(this.form.value.fechaFin, 'yyyy-MM-dd');
    var dataPrueba: Rooms[] = [];
    this.genericService.GetAll('Cities').subscribe(dataCities => {
      this.ciudades = dataCities.data;
      this.genericService.GetAll('Hotels').subscribe(dataHotels => {
        this.hoteles = dataHotels.data;
        this.genericService.GetAll('RoomTypes').subscribe(dataRoomTypes => {
          this.tipoHabitacion = dataRoomTypes.data;
          this.genericService.GetAll('Rooms?PageNumber=' + (this.pageNumber + 1) + '&PageSize=' + this.pageSize, filter).subscribe(dataRooms => {
            this.habitacion = dataRooms.data;
            this.pageSize = dataRooms.pageSize;
            this.totalItems = dataRooms.totalItems;
            this.habitacion.forEach(h => {
              var costos: Costs[] = h.costos;
              var suma = 0;
              costos.forEach(costo => {
                var sum = (costo.costo + costo.extra);
                suma += (sum + (sum * costo.impuestos / 100) + (sum * costo.porcPromocion / 100));
              });
              h.price = suma;
            });
            setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
            this.data = dataRooms.data;
          });
        });
      });
    });
  }
  ChangePage(event: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.LoadData();
  }
  Search() {
    this.loadingService.ChangeStatusLoading(true);
    var fechaInicio = this.datePipe.transform(this.form.controls['fechaInicio'].value, 'yyyy-MM-dd');
    var fechaFin = this.datePipe.transform(this.form.controls['fechaFin'].value, 'yyyy-MM-dd');
    this.router.navigate(['/search-result/selection/' + this.form.value.ciudad + '/' +
      this.form.value.personas + '/' + fechaInicio + '/' + fechaFin + '/' + this.form.value.estrellas + '/' + this.form.value.hotel]);
    this.LoadData();
  }
}
