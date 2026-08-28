import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  carreras: string[] = ['Informática', 'Administración', 'Diseño', 'Electrónica', 'Contabilidad'];
  jornadas: string[] = ['Matutina', 'Vespertina', 'Nocturna'];

  constructor(private fb: FormBuilder) {}

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
      aceptarReglamento: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.registroForm.controls; }

  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      alert('¡Formulario enviado con éxito!');
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}