import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent implements OnInit {
  registroForm!: FormGroup;
  modoEdicion: boolean = false;
  estudianteEditando: Student | null = null;

  carreras: string[] = ['Informática', 'Administración', 'Diseño', 'Electrónica', 'Contabilidad'];
  jornadas: string[] = ['Matutina', 'Vespertina', 'Nocturna'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      carne: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(14), Validators.max(25)]],
      carrera: ['', Validators.required],
      jornada: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      aceptaReglamento: [false, Validators.requiredTrue]
    });

    this.studentService.getSelectedStudent().subscribe((student) => {
      if (student) {
        this.modoEdicion = true;
        this.estudianteEditando = student;
        this.registroForm.patchValue(student);
      } else {
        this.modoEdicion = false;
        this.estudianteEditando = null;
        this.registroForm.reset({ aceptaReglamento: false });
      }
    });
  }

  get f() { return this.registroForm.controls; }

  limpiarFormulario(): void {
    this.registroForm.reset({ aceptaReglamento: false });
    this.modoEdicion = false;
    this.estudianteEditando = null;
    this.studentService.selectStudentForEdit(null);
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const datosEstudiante: Student = this.registroForm.value;

      if (this.modoEdicion && this.estudianteEditando) {
        datosEstudiante.id = this.estudianteEditando.id;
        this.studentService.updateStudent(datosEstudiante);
        this.studentService.selectStudentForEdit(null);
      } else {
        this.studentService.addStudent(datosEstudiante);
      }

      this.registroForm.reset({ aceptaReglamento: false });
      this.modoEdicion = false;
      this.estudianteEditando = null;
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}