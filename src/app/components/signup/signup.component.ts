import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    public authServiced: LoginService,
    public router: Router,
    private toast: NgToastService
  ) {}
  loader: boolean = false;
  ngOnInit(): void {}

  Signupform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    profile: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
      ),
    ]),
  });
  get f() {
    return this.Signupform.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Signupform.controls['profile'].setValue(file);
    }
  }
  onsignup() {
    this.loader = true;
    const formData = new FormData();
    formData.append('name', this.Signupform.get('name').value);
    formData.append('email', this.Signupform.get('email').value);
    formData.append('mobile', this.Signupform.get('mobile').value);
    formData.append('password', this.Signupform.get('password').value);
    formData.append('profile', this.Signupform.get('profile').value);
    this.authServiced.registerUser(formData).subscribe(
      (res) => {
        setTimeout(() => {
          this.loader = false;
          this.router.navigate([`/signin`]);
        }, 2000);
      },
      (err) => {
        this.loader = false;
        this.toast.error({
          detail: 'WARNING',
          summary: `${err.error.message}`,
          duration: 5000,
        });
      }
    );
  }
}
