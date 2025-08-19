// angular import
import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/commonService/user.service';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
interface LoginResponse {
  token: string;
  refresh_token: string;
}
@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export default class LoginComponent {
  // public props
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  Email = 'superadmin';
  password = 'superadmin';
  private _userService = inject(UserService);
  private _router = inject(Router);

  // public method
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if (this.Email && this.password) {
      this._userService.login(this.Email, this.password).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful', response);
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this._router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    }
  }
  loginType = [
    {
      image: 'assets/images/authentication/facebook.svg',
      alt: 'facebook',
      title: 'Sign In with Facebook'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      alt: 'twitter',
      title: 'Sign In with Twitter'
    },
    {
      image: 'assets/images/authentication/google.svg',
      alt: 'google',
      title: 'Sign In with Google'
    }
  ];
}
