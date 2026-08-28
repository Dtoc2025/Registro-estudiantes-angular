/** Datos registrados de un estudiante. */
export interface Student {
	id: string;
	nombreCompleto: string;
	carne: string;
	correo: string;
	edad: number;
	carrera: 'Informática' | 'Administración' | 'Diseño' | 'Electrónica' | 'Contabilidad';
	jornada: 'Matutina' | 'Vespertina' | 'Nocturna';
	fechaNacimiento: string;
	telefono: string;
	aceptaReglamento: boolean;
}
