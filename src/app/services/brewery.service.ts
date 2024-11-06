import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private readonly http: HttpClient) { }

  getBreweriesList(): Observable<any> {

    return this.http.get<any>(environment.apiEndpoint)

  }
}
