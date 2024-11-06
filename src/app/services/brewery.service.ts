import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brewery } from '../interfaces/breweries';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private readonly http: HttpClient) { }

  getBreweriesList(): Observable<Brewery[]> {

    return this.http.get<Brewery[]>(environment.apiEndpoint)

  }
}
