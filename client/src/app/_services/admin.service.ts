import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiOrigin + 'admin/';

  constructor(private http: HttpClient) { }

  getUserWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'edit-roles/' + username + '?roles=' + roles, {});
  }
}
