import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ApiResponse, Classes } from 'src/app/commonService/user.model';
import { UserService } from 'src/app/commonService/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-classes',
  imports: [ToastModule,ConfirmDialogModule,TableModule,ButtonModule,DialogModule,InputTextModule,ReactiveFormsModule,CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class ClassesComponent implements OnInit {
visible: boolean = false;
classesForm!: FormGroup;
private userService = inject(UserService);
private fb = inject(FormBuilder);
private messageService = inject(MessageService);
private confirmationService = inject(ConfirmationService);
classes: Classes[] = [];
cols = [
  { field: 'ClassDisplayName', header: 'Class' },
  { field: 'ClassTeacher', header: 'Class Teacher'},
  { field: 'NoOfStudents', header: 'No. of Students'},
  { field: 'ClassFee', header: 'Fees' }
];
isEdit:boolean=false;
constructor() {
    this.createForm();
  }
  
  createForm() {
    this.classesForm = this.fb.group(
      {
        ClassID: [''],
        ClassDisplayName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
        ClassFee: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
      }
    );
  }

  ngOnInit() {
    this.loadClasses();
  }
  private loadClasses() {
    this.userService.GetClasses().subscribe({
      next: (data: ApiResponse<Classes[]>) => {
        if (data.success) {
          this.classes = data.data;
        }
      },
      error: (err) => {
        console.error("Error loading classes:", err);
        this.showError();
      }
    });
  }
  
  addClass() {
    // logic to add class
    this.visible = true;
  }

  editClass(classObj: Classes) {
    // logic to edit
    this.visible = true;
    this.isEdit=true;

    // Populate form with existing values
    this.classesForm.patchValue({
      ClassID: classObj.ClassID,
      ClassDisplayName: classObj.ClassDisplayName,
      ClassFee: classObj.ClassFee
    });
  }

  deleteClass(classObj: Classes) {
    // logic to delete

  }
  onCancel() {
    this.visible = false;
    this.isEdit=false;
    this.classesForm.reset();
  }
  onSubmit() {
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
      return;
    }
    if (this.classesForm.valid) {
      // prepare payload
      const classData: Classes = {
        ClassID:this.classesForm.value.ClassID,
        ClassName: this.classesForm.value.ClassDisplayName.trim().replace(/\s+/g, "_"), // remove spaces → underscore
        ClassDisplayName: this.classesForm.value.ClassDisplayName.trim(),
        ClassFee: this.classesForm.value.ClassFee
      };

      this.userService.AddClass(classData).subscribe({
        next: (res: ApiResponse<Classes>) => {
          debugger
          if (res.success) {
            this.classes.unshift(res.data);
            this.visible = false;
            this.isEdit=false;
            this.showSuccess(res.message);
            this.classesForm.reset();
          } else {
            this.showError(res.message);
          }
        },
        error: (err) => {
          this.showError();
        },
        complete: () => {
          // Optional: Any final actions after the request completes
        }
      });
    } else {
      // Mark all fields as touched if invalid
      this.classesForm.markAllAsTouched();
    }
  }
  updateClass(){
     if (this.classesForm.pristine) {
      // ❌ No changes made
      this.showError("No changes detected");
      return;
    }
    if (this.classesForm.valid) {
      const classData: Classes = {
        ClassID: this.classesForm.value.ClassID,
        ClassName: this.classesForm.value.ClassDisplayName.trim().replace(/\s+/g, "_"),
        ClassDisplayName: this.classesForm.value.ClassDisplayName.trim(),
        ClassFee: this.classesForm.value.ClassFee
      };

      this.userService.UpdateClass(classData).subscribe({
        next: (res) => {
          if (res.success) {
            const index = this.classes.findIndex(c => c.ClassID === classData.ClassID);
            if (index !== -1) {
              this.classes[index] = { ...this.classes[index], ...classData };
            }
            this.visible = false;
            this.isEdit=false;
            this.classesForm.reset();
            this.showSuccess(res.message);
          } else {
            this.showError(res.message);
          }
        },
        error: (err) => {
          this.showError(err?.error?.message);
        }
      });
    } else {
      this.classesForm.markAllAsTouched();
    }
  }
  DeleteClass(ClassID: number) {
    this.userService.DeleteClass(ClassID).subscribe({
      next: (res) => {
        if (res.success) {
          this.classes = this.classes.filter(c => c.ClassID !== ClassID);
          this.showSuccess(res.message);
        } else {
          this.showError(res.message);
        }
      },
      error: (err) => {
        this.showError(err?.error?.message);
      }
    });
  }
  confirm2(event: Event, ClassID: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.DeleteClass(ClassID);
      },
      reject: () => {
      }
    });
  }

  showSuccess(message?: string) {
      this.messageService.add({ life:2000,severity: 'success', summary: 'Success', detail: message || 'Class added successfully' });
  }
  showError(message?: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message || 'An error occurred' });
  }

}
