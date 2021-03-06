import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly URL = environment.API_URL + '/routes';

  constructor(private http: HttpClient) {}

  get(station: string, type?: number) {
    const params = {
      'filter[stop]': station,
    };

    if (type) Object.assign(params, { 'filter[type]': type });

    return this.http.get(this.URL, { params }).pipe(map((r: any) => r.data));
  }
}
