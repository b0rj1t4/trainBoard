import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { Transportation } from 'src/app/enums/typeTransportation';
import { Direction } from 'src/app/enums/direction';

interface Columns {
  columnDef: string;
  header: string;
  isSortable?: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  parsedColumns: string[] = [];
  dataSource: any[] = [];

  readonly columns: Columns[] = [
    {
      columnDef: 'carrier',
      header: 'Carrier',
      isSortable: true,
    },
    {
      columnDef: 'time',
      header: 'Time',
      isSortable: true,
    },
    {
      columnDef: 'route',
      header: 'Destination',
      isSortable: true,
    },
    {
      columnDef: 'train',
      header: 'Train',
      isSortable: true,
    },
    {
      columnDef: 'track',
      header: 'Track',
      isSortable: false,
    },
    {
      columnDef: 'status',
      header: 'Status',
      isSortable: false,
    },
  ];

  station = 'BNT-0000'; // North Station

  constructor(
    private routeService: RouteService,
    private predictionService: PredictionService
  ) {}

  ngOnInit(): void {
    this.parsedColumns = this.columns.map((col) => col.columnDef);

    this.routeService
      .get(this.station, Transportation.COMMUTER_RAIL.valueOf())
      .subscribe((r) => {
        console.log(r);
        this.predictionService
          .get(this.station, r, Direction.OUTBOUND.valueOf())
          .subscribe((res) => {
            console.log(res);

            this.dataSource = res;
          });
      });
  }
}
