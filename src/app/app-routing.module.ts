import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginguardGuard } from './Guard/loginguard.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginguardGuard],

  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
