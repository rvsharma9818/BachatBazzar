import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginxComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginxComponent,
      },
      {
        path: 'signin',
        component: LoginxComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
