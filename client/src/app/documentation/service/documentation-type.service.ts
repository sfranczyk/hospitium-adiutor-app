import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentationType } from '../models/documentation-type.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentationTypeService {
  readonly endpoint = environment.apiOrigin + 'documentationtype';
  readonly endpointGetAll = environment.apiOrigin + 'documentationtype/all';
  readonly endpointGetUnused = environment.apiOrigin + 'documentationtype/unused';

  constructor(private http: HttpClient) { }

  post(model: DocumentationType): Observable<DocumentationType>{
    return this.http.post<DocumentationType>(this.endpoint, model);
  }

  get(id: number): Observable<DocumentationType>{
    return this.http.get<DocumentationType>(`${this.endpoint}/${id}`);
  }

  getList(): Observable<DocumentationType[]>{
    return this.http.get<DocumentationType[]>(this.endpoint);
  }

  getListAll(): Observable<DocumentationType[]>{
    return this.http.get<DocumentationType[]>(this.endpointGetAll);
  }

  getListUnused(): Observable<DocumentationType[]>{
    return this.http.get<DocumentationType[]>(this.endpointGetUnused);
  }

  upadte(model: DocumentationType): Observable<DocumentationType>{
    return this.http.put<DocumentationType>(`${this.endpoint}/${model.id}`, model);
  }

  restore(id: number): Observable<DocumentationType>{
    return this.http.patch<DocumentationType>(`${this.endpoint}/${id}`, id);
  }  

  delete(id: number): Observable<DocumentationType>{
    return this.http.delete<DocumentationType>(`${this.endpoint}/${id}`);
  }
}
