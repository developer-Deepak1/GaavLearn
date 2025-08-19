import { Routes } from '@angular/router';
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { authGuard } from './guards/auth.guard';

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
        canActivate: [authGuard]
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
        canActivate: [authGuard]
      }
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