import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Formulario } from './components/formulario/formulario';
import { Listado } from './components/listado/listado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Formulario, Listado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Registro de Estudiantes';
}
