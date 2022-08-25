import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginxComponent implements OnInit {
  constructor(public authServiced: LoginService, public router: Router) {}
  err: boolean = false;
  errt: string = '';
  loader: boolean = false;
  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
      ),
    ]),
  });
  get f() {
    return this.loginForm.controls;
  }

  onlogin() {
    this.loader = true;
    this.authServiced.login(this.loginForm.value).subscribe(
      (resToken) => {
        setTimeout(() => {
          this.loader = false;
          localStorage.setItem('token', resToken.data.token);
          localStorage.setItem('userId', resToken.data.userId);

          this.router.navigate(['/home']);
        }, 4000);
      },
      (err) => {
        this.errt = err.error.message;
        this.err = true;
        this.loader = false;
        setTimeout(() => {
          this.err = false;
        }, 3000);
      }
    );
  }
}
