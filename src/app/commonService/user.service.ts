import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse, Role, School } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string=environment.baseUrl;
  private _http=inject(HttpClient);

  login(email:string,password:string){
    const body = {
      username: email,
      password: password
    };
    return this._http.post<LoginResponse>(`${this.baseUrl}/login`, body);
  }
  GetSchools() {
    return this._http.get<School[]>(`${this.baseUrl}/getAllSchools`);
  }

  GetRoles() {
    return this._http.get<Role[]>(`${this.baseUrl}/getAllowedRolesForUserRole`);
  }

}
