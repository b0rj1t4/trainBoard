import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly URL = 'https://api-v3.mbta.com/routes';

  constructor(private http: HttpClient) {}

  get(station: string, type: number) {
    const paramType = `filter[type]=${type}`;
    const paramStation = `filter[stop]=${station}`;

    const url = `${this.URL}?${paramType}&${paramStation}`;

    return this.http.get(url).pipe(map((r: any) => r.data));
  }
}
