import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from 'src/app/@theme/components/card/card.component';
import { Role, School } from 'src/app/commonService/user.model';
import { UserService } from 'src/app/commonService/user.service';

@Component({
  selector: 'app-user-add-edit',
  imports: [CardComponent, DropdownModule, CalendarModule,ReactiveFormsModule,CommonModule,InputTextModule],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {
 userForm!: FormGroup;
 private userService= inject(UserService);
 schools: School[] = [];
 roles: Role[] = [];  
 constructor() {
   this.userForm = new FormGroup({
     firstName: new FormControl(null, Validators.required),
     middleName: new FormControl(null),
     lastName: new FormControl(null, Validators.required),
     SchoolID: new FormControl(null, Validators.required),
     RoleID: new FormControl(null, Validators.required)
   });
 }
  ngOnInit() {
    // Fetch schools and roles from the service
    this.userService.GetSchools().subscribe((data: School[]) => {
      this.schools = data;
    });
    this.userService.GetRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

 onSubmit() {
   if (this.userForm.valid) {
     // Handle form submission
     console.log(this.userForm.value);
   }
 }
}
