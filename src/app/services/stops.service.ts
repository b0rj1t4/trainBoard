import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  private readonly URL = environment.API_URL + '/stops';

  constructor(private http: HttpClient) {}

  get(type: number) {
    const params = {
      'filter[route_type]': type,
    };

    return this.http
      .get(this.URL, { params })
      .pipe(map((r: any) => this.mapStations(r.data)));
  }

  private mapStations(stops: any[]) {
    return stops
      .map((stop) => {
        return {
          name: stop.attributes.name,
          id: stop.id,
        };
      })
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
  }
}
