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