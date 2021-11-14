import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  endpoint = environment.apiOrigin + 'patients';

  constructor(private http: HttpClient) { }

  post(model: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.endpoint}/register`, model);
  }

  getAll(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.endpoint).pipe(
      map(patients => (
        patients.map(patient => 
          ({...patient, dateOfBirth: new Date(patient.dateOfBirth)})
        )
      ))
    );
  }

  get(id: number): Observable<Patient>{
    return this.http.get<Patient>(`${this.endpoint}/${id}`).pipe(
      map(patient =>
        ({...patient, dateOfBirth: new Date(patient.dateOfBirth)})
      )
    );
  }

  upadte(model: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${this.endpoint}`, model).pipe(
      map(patient =>
        ({...patient, dateOfBirth: new Date(patient.dateOfBirth)})
      )
    );
  }

  moveToDepartment(patientId: number, departmentId: number): Observable<void>{
    const params = { departmentId };
    return this.http.patch<void>(`${this.endpoint}/change-department/${patientId}`, null, {params});
  }

  delete(id: number): Observable<Patient>{
    return this.http.delete<Patient>(`${this.endpoint}/${id}`).pipe(
      map(patient =>
        ({...patient, dateOfBirth: new Date(patient.dateOfBirth)})
      )
    );
  }
}
