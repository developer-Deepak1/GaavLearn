import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAddUserInfo, LoginResponse, UserForm, UserListing,updatePassword, MenuItem, Classes, ApiResponse } from './user.model';

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
  GetUserSchoolID() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.SchoolID;
    }
    return null;
  }
  
  GetUserRoleID() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.RoleID;
    }
    return null;
  }
  IsPagePermission(role: string[]): boolean {
    const userRole = this.GetUserRoleID();
    return role.includes(userRole);
  }
  getAddUserInfo() {
    return this._http.get<getAddUserInfo>(`${this.baseUrl}/getAddUserInfo`);
  }
  UpdatePassword(updatePassword: updatePassword) {
    return this._http.post<boolean>(`${this.baseUrl}/updatePassword`, updatePassword);
  }
  getMenuItemsForUser() {
    return this._http.get<MenuItem[]>(`${this.baseUrl}/getMenuItemsForUser`);
  }

  //Academic
  //start  class 
  GetClasses() {
    return this._http.get<ApiResponse<Classes[]>>(`${this.baseUrl}/Academic/GetAllClasses`);
  }
  AddClass(classData: Classes) {
    return this._http.post<ApiResponse<Classes>>(`${this.baseUrl}/Academic/AddClass`, classData);
  }
  UpdateClass(classData: Classes) {
    return this._http.put<ApiResponse<null>>(`${this.baseUrl}/Academic/UpdateClass`, classData);
  }
  DeleteClass(ClassID: number) {
    return this._http.delete<ApiResponse<null>>(`${this.baseUrl}/Academic/DeleteClass/${ClassID}`);
  }
  //end class
}
