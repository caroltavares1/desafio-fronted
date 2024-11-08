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

  getBreweriesListByPage(page: string): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(environment.apiEndpoint + `?page=${page}&per_page=20`)
  }

  getBreweriesByType(page: string, type: string): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(environment.apiEndpoint + `?page=${page}&by_type=${type}&per_page=20`)
  }
}
