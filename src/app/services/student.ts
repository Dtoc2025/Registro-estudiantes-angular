import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>(this.students);
  private selectedStudentSubject = new BehaviorSubject<Student | null>(null);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  getSelectedStudent(): Observable<Student | null> {
    return this.selectedStudentSubject.asObservable();
  }

  selectStudentForEdit(student: Student | null) {
    this.selectedStudentSubject.next(student);
  }

  deleteStudent(carne: string) {
    this.students = this.students.filter(s => s.carne !== carne);
    this.studentsSubject.next([...this.students]);
  }
}
