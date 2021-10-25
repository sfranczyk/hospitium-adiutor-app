import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  endpoint = environment.apiOrigin + 'patient';

  constructor(private http: HttpClient) { }

  post(model: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.endpoint}/register`, model);
  }

  getAll(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.endpoint);
  }

  get(id: number): Observable<Patient>{
    return this.http.get<Patient>(`${this.endpoint}/${id}`);
  }

  upadte(model: Patient): Observable<Patient>{
    console.log(model);
    return this.http.put<Patient>(`${this.endpoint}/${model.id}`, model);
  }

  delete(id: number): Observable<Patient>{
    return this.http.delete<Patient>(`${this.endpoint}/${id}`);
  }
}
