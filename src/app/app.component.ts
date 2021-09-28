import { Component } from '@angular/core';
import * as moment from 'moment';
import { forkJoin, of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Direction } from './enums/direction';
import { PredictionService } from './services/prediction.service';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'trainBoard';
  timeToReFresh = 0; // To miliseconds
  stationByDefault = 'BNT-0000';
  predictions;

  private routes;

  constructor(
    private routeService: RouteService,
    private predictionService: PredictionService
  ) {
    this.timeToReFresh = this.timeRestart();
    this.getData();
  }

  newStation(station: string) {
    this.stationByDefault = station;
    this.getData();
  }

  getRoutes() {
    this.routeService.get(this.stationByDefault).subscribe((r) => {
      this.routes = r;
    });
  }

  getData() {
    forkJoin({
      routes: this.routeService.get(this.stationByDefault),
    }).subscribe(({ routes }) => {
      this.routes = routes;
      this.getPredictions();
    });
  }

  getPredictions() {
    this.predictionService
      .get(this.stationByDefault, this.routes, Direction.OUTBOUND.valueOf())
      .subscribe((res) => {
        console.log(res);

        this.predictions = res;

        const timeToDeparture = moment(res[0].time).diff(moment());

        console.log(timeToDeparture);
        console.log(this.timeToReFresh);

        console.log(
          timeToDeparture < this.timeToReFresh
            ? timeToDeparture
            : this.timeToReFresh
        );
      });
  }

  async refresh(event) {
    this.timeToReFresh = event;
    timer(2).subscribe(() => {
      this.timeToReFresh = this.timeRestart();
    });
    this.getPredictions();
  }

  private readonly timeRestart = (): number => 3 * 60000;
}
