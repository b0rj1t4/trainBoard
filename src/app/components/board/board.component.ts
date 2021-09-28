import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
export class BoardComponent implements OnChanges {
  parsedColumns: string[] = [];
  dataSource;
  readonly columns: Columns[] = [
    {
      columnDef: 'carrier',
      header: 'Carrier',
      isSortable: false,
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
      isSortable: false,
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

  @Input() station = 'BNT-0000'; // North Station
  @Input() predictions = [];

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    this.parsedColumns = this.columns.map((col) => col.columnDef);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.predictions);
    this.dataSource.sort = this.sort;
  }
}
