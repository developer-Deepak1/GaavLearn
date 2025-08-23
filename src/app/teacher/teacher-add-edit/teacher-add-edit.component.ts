import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from "src/app/@theme/components/card/card.component";
import { Subjects } from 'src/app/commonService/user.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserService } from 'src/app/commonService/user.service';
import { USER_ROLES } from 'src/app/commonService/constants';

@Component({
  selector: 'app-teacher-add-edit',
  imports: [CardComponent, DropdownModule, CalendarModule, ReactiveFormsModule, CommonModule, InputTextModule,MultiSelectModule],
  templateUrl: './teacher-add-edit.component.html',
  styleUrl: './teacher-add-edit.component.scss'
})
export class TeacherAddEditComponent implements OnInit {
 userForm!: FormGroup;
 public subjects: Subjects[] = [];
 private userService =  inject(UserService);
 isSubmitting:boolean = false;
 constructor(private fb: FormBuilder) {}

 ngOnInit() {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      MiddleName: [''],
      LastName: ['', Validators.required],
      Email: ['', [Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Subject: ['', Validators.required],
      RoleID: USER_ROLES.TEACHER,
      SchoolID: this.userService.GetUserSchoolID(),
    });

    this.subjects = [
      { subjectId: 1, subjectName: 'Mathematics', subjectCode: 'MATH101' },
      { subjectId: 2, subjectName: 'Physics', subjectCode: 'PHY101' },
      { subjectId: 3, subjectName: 'Chemistry', subjectCode: 'CHEM101' },
      { subjectId: 4, subjectName: 'Biology', subjectCode: 'BIO101' },
      { subjectId: 5, subjectName: 'English', subjectCode: 'ENG101' },
    ];
  }
  // Getter for easy access to subjects form array
  get Subjects  () {
    return this.userForm.get('Subjects') as FormArray;
  }
  // Add new subject control
  addSubject() {
    this.Subjects.push(this.fb.control(''));
  }
  // Remove a subject at a specific index
  removeSubject(index: number) {
    this.Subjects.removeAt(index);
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
