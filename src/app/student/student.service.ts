import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StudentAttendanceModel, studentModel } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private dataUrl='http://localhost:8000';
  private _http=inject(HttpClient);

  getStudents():Observable<studentModel[]> {
    return this._http.get<studentModel[]>(this.dataUrl+'/students');
  }
  getStudentCount():Observable<number>{
    return this._http.get<studentModel[]>(this.dataUrl+'/students').pipe(
      map((students: studentModel[]) => students.length)
    );
  }
  getClassCount():Observable<number>{
    return this._http.get<studentModel[]>(this.dataUrl+'/students').pipe(
      map((students: studentModel[]) => students.length)
    );
  }
  getByAttendanceDate(cl:string,section:string,date: string): Observable<any> {

    return this._http.get<any>(`${this.dataUrl}/attendance?class=${cl}&section=${section}&date=${date}`);
  }
}
