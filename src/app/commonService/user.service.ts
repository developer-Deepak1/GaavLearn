import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAddUserInfo, LoginResponse, UserForm, UserListing,updatePassword } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string=environment.baseUrl;
  private _http=inject(HttpClient);

  createUser(user: UserForm) {
    return this._http.post(`${this.baseUrl}/createUser`, user);
  }
  
  getAllUsers() {
    return this._http.get<UserListing[]>(`${this.baseUrl}/getAllUsers`);
  }

  login(email:string,password:string){
    const body = {
      username: email,
      password: password
    };
    return this._http.post<LoginResponse>(`${this.baseUrl}/login`, body);
  }
  
  GetUserRoleID() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.RoleID;
    }
    return null;
  }
  getAddUserInfo() {
    return this._http.get<getAddUserInfo>(`${this.baseUrl}/getAddUserInfo`);
  }
  UpdatePassword(updatePassword: updatePassword) {
    return this._http.post<boolean>(`${this.baseUrl}/updatePassword`, updatePassword);
  }

}
