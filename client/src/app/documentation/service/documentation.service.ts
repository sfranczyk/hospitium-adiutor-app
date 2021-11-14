import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Documentation } from '../models/documentation.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  endpoint = environment.apiOrigin + 'documentation';

  constructor(private http: HttpClient) { }

  post(model: Documentation): Observable<Documentation>{
    return this.http.post<Documentation>(this.endpoint, model);
  }

  getByPatient(patientId: number): Observable<Documentation[]>{
    return this.http.get<Documentation[]>(`${this.endpoint}/list/${patientId}`).pipe(
      map(docs => (
        docs.map(doc => 
          ({...doc, created: new Date(doc.created as unknown as string)})
        )
      ))
    );
  }

  get(id: number): Observable<Documentation>{
    return this.http.get<Documentation>(`${this.endpoint}/${id}`).pipe(
      map(doc => 
        ({...doc, created: new Date(doc.created as unknown as string)})
      )
    );
  }

  upadte(model: Documentation): Observable<Documentation>{
    console.log(model);
    return this.http.put<Documentation>(`${this.endpoint}/${model.id}`, model);
  }

  delete(id: number): Observable<Documentation>{
    return this.http.delete<Documentation>(`${this.endpoint}/${id}`);
  }
}
