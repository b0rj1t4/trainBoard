import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departures } from '../models/departures';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private readonly URL = 'https://api-v3.mbta.com/predictions';

  constructor(private http: HttpClient) {}

  get(station: string, routes: any, direction: number) {
    const paramRoute = `filter[route]=${routes
      .map((r: any) => r.id)
      .join(',')}`;
    const paramStation = `filter[stop]=${station}`;
    const paramDirection = `filter[direction_id]=${direction}`;

    const include = `include=vehicle,route,stop`;
    const sort = `sort=departure_time`;

    const url = `${this.URL}?${paramRoute}&${paramStation}&${paramDirection}&${sort}&${include}`;

    return this.http
      .get(url)
      .pipe(map((r: any) => this.mapPredictions(r.data)));
  }

  private mapPredictions(predictions: any[]): Departures[] {
    return predictions.map((prediction) => {
      return {
        carrier: 'MTBA',
        time: prediction.attributes.departure_time || 'TBD',
        route: prediction?.relationships?.route?.data?.id,
        train: prediction?.relationships?.vehicle?.data?.id || 'TBD',
        track: prediction?.relationships?.stop?.data?.id || 'TBD',
        status: prediction.attributes.status || 'Pending',
      };
    });
  }
}
