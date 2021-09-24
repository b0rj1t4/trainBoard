import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Departures } from '../models/departures';
import { mapPredictions } from './mappers/departures.mapper';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly URL = environment.API_URL + '/schedules';

  constructor(private http: HttpClient) {}

  get(station: string, routes: any, direction: number) {
    const params = {
      'filter[route]': routes.map((r: any) => r.id).join(','),
      'filter[stop]': station,
      'filter[direction_id]': direction,
      include: 'route,stop',
      sort: 'departure_time',
    };

    return this.http
      .get(this.URL, { params })
      .pipe(map((r: any) => mapPredictions(r.data)));
  }
}
