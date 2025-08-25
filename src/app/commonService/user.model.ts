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
  Subjects?: string;
  }

export interface UserListing {
  UserID: string;
  Username: string;
  RoleID: string;
  FullName: string;
  ContactNumber: string;
  EmailID: string;
}


export interface MenuItem {
  id: number;
  title: string;
  type: string;
  classes?: string | null;
  icon?: string | null;
  url?: string | null;
  parent_id: number;
  children?: MenuItem[];
}

export interface Subjects {
  subjectId: number;
  subjectName: string;
  subjectCode: string;
}

export interface Classes {
  ClassID?: number;
  ClassName?: string;
  ClassTeacher?:string;
  NoOfStudents?: number;
  ClassDisplayName?: string;
  ClassFee?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}