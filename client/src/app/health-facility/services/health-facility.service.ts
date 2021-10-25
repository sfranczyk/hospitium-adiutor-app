import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthFacility } from '../models/health-facility.model';

@Injectable({
  providedIn: 'root'
})
export class HealthFacilityService {

  constructor(private http: HttpClient) { }

  post(model: HealthFacility): Observable<HealthFacility>{
    return this.http.post<HealthFacility>(environment.apiOrigin + 'healthfacility', model);
  }

  getAll(): Observable<HealthFacility[]>{
    return this.http.get<HealthFacility[]>(environment.apiOrigin + 'healthfacility');
  }

  get(id: number): Observable<HealthFacility>{
    return this.http.get<HealthFacility>(environment.apiOrigin + `healthfacility/${id}`);
  }

  upadte(model: HealthFacility): Observable<HealthFacility>{
    console.log(model);
    return this.http.put<HealthFacility>(environment.apiOrigin + `healthfacility/${model.id}`, model);
  }

  delete(id: number): Observable<HealthFacility>{
    return this.http.delete<HealthFacility>(environment.apiOrigin + `healthfacility/${id}`);
  }
}
