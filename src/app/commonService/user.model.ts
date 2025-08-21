export interface LoginResponse {
  token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  school: string;
  role: string;
}

export interface School {
  SchoolID: string;
  SchoolName: string;
}
export interface Role {
  RoleID: string;
  RoleName: string;
}
export interface getAddUserInfo {
  schools: School[];
  roles: Role[];
}
export interface updatePassword {
  newPassword: string;
  oldPassword: string;
}

export interface UserForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  mobile: string;
  schoolID: string;
  roleID: string;
  }

export interface UserListing {
  UserID: string;
  Username: string;
  RoleID: string;
  FullName: string;
  ContactNumber: string;
  EmailID: string;
}