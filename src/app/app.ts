import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario';

@Component({
  imports: [RouterOutlet, FormularioComponent] ,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('registro_estudiantes_proyecto');
}
