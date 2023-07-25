import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/core/models/rooms/rooms';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {
  public rooms: Rooms[];
  constructor(public genericService: GenericService) {
  }
  ngOnInit(): void {
    this.LoadData();
  }
  LoadData() {
    this.genericService.GetAll('Rooms').subscribe(data => {
      console.log(data);
      this.rooms = data.data;
    });
  }
}
