import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRoutes, EmptyRoutes } from './app-routes';
import { tokenInterceptor } from './Interceptor/token.interceptor';
import { loaderInterceptor } from './Interceptor/loader.interceptor';

const routes: Routes = [
  ...AdminRoutes,
  ...EmptyRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,BrowserModule,BrowserAnimationsModule],
  exports: [RouterModule],
  providers: [
    provideHttpClient(
      withInterceptors([tokenInterceptor, loaderInterceptor])
    )
  ]
})
export class AppRoutingModule {}
