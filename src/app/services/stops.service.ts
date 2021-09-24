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
      'filter[type]': type,
    };

    return this.http.get(this.URL, { params }).pipe(map((r: any) => r.data));
  }
}
