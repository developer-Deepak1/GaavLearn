import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardComponent } from "src/app/@theme/components/card/card.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { StudentAttendanceModel } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-attendance',
  imports: [RadioButtonModule ,TableModule,CardComponent,FormsModule,ReactiveFormsModule,DropdownModule,CalendarModule,ButtonModule,DatePipe],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export class StudentAttendanceComponent implements OnInit {
 attendanceForm!: FormGroup;
 isSubmitted = false;
 students: StudentAttendanceModel[] = [];
 private _studentService=inject(StudentService);

 classes = [
    { label: 'Class 1', value: '1' },
    { label: 'Class 2', value: '2' },
    { label: 'Class 3', value: '3' }
  ];

  sections = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' }
  ];

  constructor(private fb: FormBuilder,private cdr:ChangeDetectorRef) {
    this.attendanceForm = this.fb.group({
      class: [null, Validators.required],
      section: [null, Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }
  ngOnInit() {
    // Initialize any data or state here
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      console.log(this.attendanceForm.value);
      this.isSubmitted=true;
      const rawDate = this.attendanceForm.value.date;
      this._studentService.getByAttendanceDate(this.attendanceForm.value.class, this.attendanceForm.value.section, rawDate).subscribe(students => {
      this.students = students?.data;
    });
    }
  }

  attendanceOptions = ['Present', 'Absent', 'Half Day'];
  markAttendance(student: StudentAttendanceModel, status: string) {
    student.status = status;
    console.log(`${student.studentName} marked as ${status}`);
  }

  saveAttendance() {
    console.log('Attendance data:', this.students);
    // You can send this.students to your backend API here
  }
}
