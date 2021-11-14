import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  constructor(private http: HttpClient) { }

  post(model: Department): Observable<Department>{
    return this.http.post<Department>(environment.apiOrigin + 'department', model);
  }

  getAll(): Observable<Department[]>{
    return this.http.get<Department[]>(environment.apiOrigin + 'department');
  }

  get(id: number): Observable<Department>{
    return this.http.get<Department>(environment.apiOrigin + `department/${id}`);
  }

  upadte(model: Department): Observable<Department>{
    return this.http.put<Department>(environment.apiOrigin + `department/${model.id}`, model);
  }

  delete(id: number): Observable<Department>{
    return this.http.delete<Department>(environment.apiOrigin + `department/${id}`);
  }
}
