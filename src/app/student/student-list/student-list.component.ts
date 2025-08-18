import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { studentModel } from '../student.model';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardComponent } from "src/app/@theme/components/card/card.component";

@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [CommonModule, TableModule, CardComponent],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
 students: studentModel[]=[];
 columns=[
    { field: 'studentName', header: 'Name' },
    { field: 'fatherName', header: 'Father Name' },
    { field: 'motherName', header: 'Mother Name' },
    { field: 'dateOfBirth', header: 'Date of Birth' },
    { field: 'class', header: 'Class' },
    { field: 'section', header: 'Section' },
    { field: 'dateOfAdmission', header: 'Date of Admission' },
    { field: 'gender', header: 'Gender' },
    { field: 'phoneNumber', header: 'Phone Number' },
    { field: 'registrationNumber', header: 'Registration Number' }
  ];

  private _studentService = inject(StudentService);
  // constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this._studentService.getStudents().subscribe((data: studentModel[]) => {
      this.students = data;
      // this.cdr.detectChanges();
    });
  }
}
