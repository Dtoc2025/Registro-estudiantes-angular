import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './components/formulario/formulario';
import { ListadoComponent } from './components/listado/listado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponent, ListadoComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Registro de Estudiantes';
}