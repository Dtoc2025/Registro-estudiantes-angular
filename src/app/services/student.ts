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
  private storageKey = 'estudiantes';

  constructor() {
    this.loadFromLocalStorage();
  }

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
    student.id = this.students.length + 1;
    this.students.push(student);
    this.saveToLocalStorage();
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(studentActualizado: Student): void {
    const index = this.students.findIndex(s => s.id === studentActualizado.id);
    if (index !== -1) {
      this.students[index] = studentActualizado;
      this.saveToLocalStorage();
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.saveToLocalStorage();
    this.studentsSubject.next([...this.students]);
  }

  private saveToLocalStorage(): void {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.students));
    }
  }

  private loadFromLocalStorage(): void {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.students = JSON.parse(data);
      }
    }
  }
}