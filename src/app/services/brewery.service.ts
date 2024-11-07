import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brewery } from '../interfaces/brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private readonly http: HttpClient) { }

  getBreweriesList(): Observable<Brewery[]> {

    return this.http.get<Brewery[]>(environment.apiEndpoint + '?page=1&per_page=20')
  }

  getBreweriesListByPage(page: string): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(environment.apiEndpoint + `?page=${page}&per_page=20`)
  }
}
