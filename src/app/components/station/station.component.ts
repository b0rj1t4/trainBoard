import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StopsService } from 'src/app/services/stops.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  stations: any[] = [];
  @Input() selectedStation;
  @Output() readonly stationChange = new EventEmitter<string>();

  constructor(private stopServices: StopsService) {
    this.stopServices.get(2).subscribe((r) => (this.stations = r));
  }

  ngOnInit(): void {}

  onStationChange(selected: string) {
    this.stationChange.emit(selected);
  }
}
