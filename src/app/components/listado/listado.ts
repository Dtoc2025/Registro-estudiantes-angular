import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado implements OnInit {
  estudiantes: Student[] = [];
  estudianteAEliminar: Student | null = null;
  mostrarModal: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.estudiantes = data;
    });
  }

  onEditar(estudiante: Student): void {
    this.studentService.selectStudentForEdit(estudiante);
  }

  confirmarEliminacion(estudiante: Student): void {
    this.estudianteAEliminar = estudiante;
    this.mostrarModal = true;
  }

  cancelarEliminacion(): void {
    this.estudianteAEliminar = null;
    this.mostrarModal = false;
  }

  eliminarEstudiante(): void {
    if (this.estudianteAEliminar) {
      this.studentService.deleteStudent(this.estudianteAEliminar.carne);
      this.cancelarEliminacion();
    }
  }

  limpiarSeleccion(): void {
    this.studentService.selectStudentForEdit(null);
  }
}
