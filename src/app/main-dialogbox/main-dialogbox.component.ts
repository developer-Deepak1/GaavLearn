import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogServiceService } from '../commonService/dialog-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../commonService/user.service';
@Component({
  selector: 'app-main-dialogbox',
  imports: [DialogModule,ReactiveFormsModule,ButtonModule,CommonModule],
  templateUrl: './main-dialogbox.component.html',
  styleUrl: './main-dialogbox.component.scss'
})
export class MainDialogboxComponent implements OnInit {
visible = false;
isFirstLogin = false;
passwordForm!: FormGroup;
private dialogService = inject(DialogServiceService);
private userService = inject(UserService);

constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    const oldPass = form.get('oldPassword')?.value;
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;

    if (newPass && oldPass && newPass === oldPass) {
      return { sameAsOld: true };
    }

    if (newPass && confirmPass && newPass !== confirmPass) {
      return { mismatch: true };
    }

    return null;
  }
  ngOnInit(): void {
    this.dialogService.visible$.subscribe((isVisible) => {
      this.visible = isVisible;
    });
    this.firstime();
  }
  firstime() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.IsFirstLogin === 1) {
        this.isFirstLogin = true;
        this.visible = true; // open dialog automatically
      }
    }
  }

  onHide() {
    this.dialogService.hide();
  }
  onSubmit() {
    if (this.passwordForm.valid) {
       this.userService.UpdatePassword(this.passwordForm.value).subscribe((response) => {
       this.firstimeLocalStorageUpdate();
       });
       this.onHide();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
  firstimeLocalStorageUpdate() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.IsFirstLogin === 1) {
        user.IsFirstLogin = 0; // mark as not first login anymore
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    this.isFirstLogin = false;
    this.visible = false; // close dialog automatically
  }
}
