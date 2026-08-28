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

  selectStudentForEdit(student: Student | null): void {
    this.selectedStudentSubject.next(student);
  }

  addStudent(student: Student): void {
    this.students.push(student);
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(studentActualizado: Student): void {
    const index = this.students.findIndex(s => s.carne === studentActualizado.carne);
    if (index !== -1) {
      this.students[index] = studentActualizado;
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(carne: string): void {
    this.students = this.students.filter(s => s.carne !== carne);
    this.studentsSubject.next([...this.students]);
  }
}
