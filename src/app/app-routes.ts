import { Routes } from '@angular/router';
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { authGuard } from './guards/auth.guard';
import { USER_ROLES } from './commonService/constants';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component'),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN, USER_ROLES.TEACHER, USER_ROLES.STUDENT] }
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/components/component.module').then((m) => m.ComponentModule),
        canActivate: [authGuard]
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/other/sample-page/sample-page.component'),
        canActivate: [authGuard]
      },
      {
        path: 'student-list',
        loadComponent: () => import('./student/student-list/student-list.component').then((m) => m.StudentListComponent),
        canActivate: [authGuard]
      },
      {
        path: 'student-attendance',
        loadComponent: () => import('./student/student-attendance/student-attendance.component').then((m) => m.StudentAttendanceComponent),
        canActivate: [authGuard]
      },
      {
        path: 'fee-receipt',
        loadComponent: () => import('./features/fee-receipt/fee-receipt.component').then((m) => m.FeeReceiptComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN,USER_ROLES.TEACHER, USER_ROLES.STUDENT] }
      },
      {
        path: 'user-listing',
        loadComponent: () => import('./features/user-listing/user-listing.component').then((m) => m.UserListingComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN] }
      },
      {
        path: 'user-add-edit',
        loadComponent: () => import('./features/user-add-edit/user-add-edit.component').then((m) => m.UserAddEditComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN] }
      },
      //start -teacher section
      { 
        path: 'teacher-add',
        loadComponent: () => import('./teacher/teacher-add-edit/teacher-add-edit.component').then((m) => m.TeacherAddEditComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN] }
      },
      {
        path: 'teacher-listing',
        loadComponent: () => import('./teacher/teacher-listing/teacher-listing.component').then((m) => m.TeacherListingComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN] }
      },
      {
        path: 'teacher-attendance-report',
        loadComponent: () => import('./teacher/teacher-attendance/teacher-attendance.component').then((m) => m.TeacherAttendanceComponent),
        canActivate: [authGuard],
        data: { roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.CLIENT_ADMIN] }
      }
      //end -teacher section
    ]
  }
];


export const EmptyRoutes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  }
];