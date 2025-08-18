export class studentModel{
    studentId?: number ;
    studentName?: string;
    fatherName?: string;
    motherName?: string;
    dateOfBirth?: string;
    class?: string;
    section?: string;
    dateOfAdmission?: string;
    gender?: string;
    phoneNumber?: string;
    registrationNumber?: string;
}

export class StudentAttendanceModel {
  studentId?: string;
  studentName?: string;
  fatherName?: string;
  phoneNumber?: string;
  status?: string; // 'Present' | 'Absent' | 'Half Day'
  remark?: string;
  attendanceDate?: Date;
  class?: string;
  section?: string;
}