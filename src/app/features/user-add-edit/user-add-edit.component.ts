import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
 isSubmitting:boolean = false;  

 constructor() {
   this.userForm = new FormGroup({
     FirstName: new FormControl(null, Validators.required),
     MiddleName: new FormControl(null),
     LastName: new FormControl(null, Validators.required),
     SchoolID: new FormControl(null, Validators.required),
     RoleID: new FormControl(null, Validators.required),
     Email: new FormControl('', [Validators.email]),
     Mobile: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)])
   });
 }
  ngOnInit() {
    // Fetch schools and roles from the service
    this.userForm.get('RoleID')?.valueChanges.subscribe(value =>{
      const SchoolIDControl = this.userForm.get('SchoolID');
      if(value==1) {
        SchoolIDControl?.setValue(null);
        SchoolIDControl?.setValidators(null);
        SchoolIDControl?.disable();
      }
      else{
        SchoolIDControl?.enable();
        SchoolIDControl?.setValidators(Validators.required);
      }
      SchoolIDControl?.updateValueAndValidity();
    });

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
     this.isSubmitting = true;
     this.userService.createUser(this.userForm.value).subscribe({
       next: (response) => {
         console.log('User created successfully:', response);
       },
       error: (error) => {
         console.error('Error creating user:', error);
         this.isSubmitting=false;
       },
       complete: () => {
         this.isSubmitting = false;
         alert('User created successfully');
       }
     });
   }
 }
}
