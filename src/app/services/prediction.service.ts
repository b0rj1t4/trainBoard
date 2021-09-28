import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { mapPredictions } from './mappers/departures.mapper';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private readonly URL = environment.API_URL + '/predictions';

  constructor(private http: HttpClient) {}

  get(station: string, routes: any, direction: number) {
    const params = {
      'filter[route]': routes.map((r: any) => r.id).join(','),
      'filter[stop]': station,
      'filter[direction_id]': direction,
      include: 'vehicle,route,stop,schedule',
      sort: 'departure_time',
    };

    return this.http
      .get(this.URL, { params })
      .pipe(map((r: any) => mapPredictions(r)));
  }
}
