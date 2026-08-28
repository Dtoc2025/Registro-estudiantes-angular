import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
	private readonly storageKey = 'students_data';

	/** Retorna todos los estudiantes guardados localmente. */
	getStudents(): Student[] {
		if (!this.hasStorage()) {
			return [];
		}

		try {
			const storedStudents = localStorage.getItem(this.storageKey);

			if (!storedStudents) {
				return [];
			}

			const students: unknown = JSON.parse(storedStudents);
			return Array.isArray(students) ? students.filter(this.isStudent) : [];
		} catch {
			return [];
		}
	}

	/** Indica si el carné no está registrado, excluyendo opcionalmente un estudiante. */
	isCarneUnique(carne: string, excludeId?: string): boolean {
		const normalizedCarne = this.normalize(carne);

		return !this.getStudents().some((student) =>
			this.normalize(student.carne) === normalizedCarne && student.id !== excludeId,
		);
	}

	/** Agrega un estudiante si su carné no está registrado. */
	addStudent(student: Student): { success: boolean; message?: string } {
		if (!this.isStudent(student)) {
			return { success: false, message: 'Los datos del estudiante no son válidos.' };
		}

		if (!this.isCarneUnique(student.carne)) {
			return { success: false, message: 'El carné ya está registrado.' };
		}

		return this.saveStudents([...this.getStudents(), student])
			? { success: true }
			: { success: false, message: 'No se pudo guardar el estudiante.' };
	}

	/** Actualiza un estudiante existente y valida la unicidad de su carné. */
	updateStudent(updatedStudent: Student): { success: boolean; message?: string } {
		if (!this.isStudent(updatedStudent)) {
			return { success: false, message: 'Los datos del estudiante no son válidos.' };
		}

		const students = this.getStudents();
		const studentIndex = students.findIndex((student) => student.id === updatedStudent.id);

		if (studentIndex === -1) {
			return { success: false, message: 'El estudiante no existe.' };
		}

		if (!this.isCarneUnique(updatedStudent.carne, updatedStudent.id)) {
			return { success: false, message: 'El carné ya está registrado.' };
		}

		const updatedStudents = [...students];
		updatedStudents[studentIndex] = updatedStudent;

		return this.saveStudents(updatedStudents)
			? { success: true }
			: { success: false, message: 'No se pudo actualizar el estudiante.' };
	}

	/** Elimina un estudiante por su identificador. */
	deleteStudent(id: string): boolean {
		const students = this.getStudents();
		const remainingStudents = students.filter((student) => student.id !== id);

		return remainingStudents.length !== students.length && this.saveStudents(remainingStudents);
	}

	/** Busca por nombre completo o carné, sin distinguir mayúsculas/minúsculas. */
	searchStudents(query: string): Student[] {
		const normalizedQuery = this.normalize(query);

		return this.getStudents().filter((student) =>
			this.normalize(student.nombreCompleto).includes(normalizedQuery)
			|| this.normalize(student.carne).includes(normalizedQuery),
		);
	}

	/** Retorna la cantidad de estudiantes registrados. */
	getTotalStudents(): number {
		return this.getStudents().length;
	}

	/** Busca un estudiante por su id. Retorna undefined si no existe. */
	getStudentById(id: string): Student | undefined {
		return this.getStudents().find((student) => student.id === id);
	}

	/** Guarda el listado actualizado y reporta si la persistencia tuvo éxito. */
	private saveStudents(students: Student[]): boolean {
		if (!this.hasStorage()) {
			return false;
		}

		try {
			localStorage.setItem(this.storageKey, JSON.stringify(students));
			return true;
		} catch {
			return false;
		}
	}

	/** Comprueba que localStorage esté disponible en el entorno actual. */
	private hasStorage(): boolean {
		return typeof localStorage !== 'undefined';
	}

	/** Normaliza textos para comparaciones sin distinguir mayúsculas/minúsculas. */
	private normalize(value: string): string {
		return value.trim().toLocaleLowerCase();
	}

	/** Valida la estructura mínima de un registro recuperado o recibido en runtime. */
	private isStudent(value: unknown): value is Student {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const student = value as Partial<Student>;
		return typeof student.id === 'string'
			&& student.id.trim().length > 0
			&& typeof student.nombreCompleto === 'string'
			&& typeof student.carne === 'string'
			&& student.carne.trim().length > 0
			&& typeof student.correo === 'string'
			&& typeof student.edad === 'number'
			&& Number.isFinite(student.edad)
			&& (student.carrera === 'Informática'
				|| student.carrera === 'Administración'
				|| student.carrera === 'Diseño'
				|| student.carrera === 'Electrónica'
				|| student.carrera === 'Contabilidad')
			&& (student.jornada === 'Matutina'
				|| student.jornada === 'Vespertina'
				|| student.jornada === 'Nocturna')
			&& typeof student.fechaNacimiento === 'string'
			&& typeof student.telefono === 'string'
			&& typeof student.aceptaReglamento === 'boolean';
	}
}
