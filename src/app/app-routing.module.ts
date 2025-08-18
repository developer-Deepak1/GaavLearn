import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
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
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/components/component.module').then((m) => m.ComponentModule)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/other/sample-page/sample-page.component')
      },
      {
        path: 'student-list',
        loadComponent: () => import('./student/student-list/student-list.component').then((m) => m.StudentListComponent)
      },
      {
        path: 'student-attendance',
        loadComponent: () => import('./student/student-attendance/student-attendance.component').then((m) => m.StudentAttendanceComponent)
      },
      {
        path: 'fee-receipt',
        loadComponent: () => import('./features/fee-receipt/fee-receipt.component').then((m) => m.FeeReceiptComponent)
      }
    ]
  },
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

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,BrowserModule,BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
