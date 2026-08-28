import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class ListadoComponent implements OnInit {
  estudiantes: Student[] = [];
  estudiantesFiltrados: Student[] = [];
  estudianteAEliminar: Student | null = null;
  mostrarModal: boolean = false;
  totalEstudiantes: number = 0;
  terminoBusqueda: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.estudiantes = data;
      this.estudiantesFiltrados = [...this.estudiantes];
      this.totalEstudiantes = this.estudiantes.length;
    });
  }

  buscarEstudiantes(event: any): void {
    this.terminoBusqueda = event.target.value;
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    if (!this.terminoBusqueda) {
      this.estudiantesFiltrados = [...this.estudiantes];
      return;
    }
    const termino = this.terminoBusqueda.toLowerCase();
    this.estudiantesFiltrados = this.estudiantes.filter(est =>
      est.nombreCompleto.toLowerCase().includes(termino) ||
      est.carne.includes(this.terminoBusqueda)
    );
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
      this.studentService.deleteStudent(this.estudianteAEliminar.id!);
      this.cancelarEliminacion();
    }
  }

  limpiarSeleccion(): void {
    this.terminoBusqueda = '';
    this.studentService.selectStudentForEdit(null);
    this.estudiantesFiltrados = [...this.estudiantes];
  }
}