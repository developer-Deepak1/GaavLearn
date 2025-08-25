// angular import
import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/commonService/user.service';
import { ToastModule } from 'primeng/toast';
// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MessageService } from 'primeng/api';
interface LoginResponse {
  token: string;
  refresh_token: string;
}
@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss'],
  providers: [MessageService]
})
export default class LoginComponent {
  // public props
  hide = true;
  email = new FormControl('', [Validators.required]);
  Email = 'superSA002';
  password = 'superSA002';
  private _userService = inject(UserService);
  private _router = inject(Router);
  private messageService = inject(MessageService);
  // public method
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an username';
    }
    return this.email.hasError('email') ? 'Not a valid username' : '';
  }

  onSubmit() {
    if (this.Email && this.password) {
      this._userService.login(this.Email, this.password).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('user', JSON.stringify(response.userInformation));
          this._router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.showError(error?.error?.message);
        },
        complete: () => {
          this.showSuccess();
        }
      });
    }
  }
  showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
    }
  showError(message?: string) {
    if (!message) {
      message = 'Please check your valid credentials';
    }
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  // loginType = [
  //   {
  //     image: 'assets/images/authentication/facebook.svg',
  //     alt: 'facebook',
  //     title: 'Sign In with Facebook'
  //   },
  //   {
  //     image: 'assets/images/authentication/twitter.svg',
  //     alt: 'twitter',
  //     title: 'Sign In with Twitter'
  //   },
  //   {
  //     image: 'assets/images/authentication/google.svg',
  //     alt: 'google',
  //     title: 'Sign In with Google'
  //   }
  // ];
}
