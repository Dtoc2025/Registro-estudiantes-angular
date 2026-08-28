import { TestBed } from '@angular/core/testing';
import { StudentService } from './student';
import { Student } from '../models/student';

describe('StudentService', () => {
	let service: StudentService;

	const baseStudent: Student = {
		id: 'test-id-1',
		nombreCompleto: 'Juan Pérez',
		carne: '12345',
		correo: 'juan@correo.com',
		edad: 20,
		carrera: 'Informática',
		jornada: 'Matutina',
		fechaNacimiento: '2004-01-01',
		telefono: '12345678',
		aceptaReglamento: true,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StudentService);
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('debe agregar un estudiante correctamente', () => {
		const result = service.addStudent(baseStudent);
		expect(result.success).toBe(true);
		expect(service.getTotalStudents()).toBe(1);
	});

	it('no debe permitir carné duplicado', () => {
		service.addStudent(baseStudent);
		const result = service.addStudent({ ...baseStudent, id: 'test-id-2', correo: 'otro@correo.com' });
		expect(result.success).toBe(false);
		expect(result.message).toContain('carné');
	});

	it('debe actualizar un estudiante existente', () => {
		service.addStudent(baseStudent);
		const result = service.updateStudent({ ...baseStudent, nombreCompleto: 'Juan Actualizado' });
		expect(result.success).toBe(true);
		expect(service.getStudentById(baseStudent.id)?.nombreCompleto).toBe('Juan Actualizado');
	});

	it('debe eliminar un estudiante', () => {
		service.addStudent(baseStudent);
		const deleted = service.deleteStudent(baseStudent.id);
		expect(deleted).toBe(true);
		expect(service.getTotalStudents()).toBe(0);
	});

	it('debe buscar estudiantes por nombre o carné', () => {
		service.addStudent(baseStudent);
		expect(service.searchStudents('juan').length).toBe(1);
		expect(service.searchStudents('12345').length).toBe(1);
		expect(service.searchStudents('inexistente').length).toBe(0);
	});

	it('debe encontrar un estudiante por id', () => {
		service.addStudent(baseStudent);
		expect(service.getStudentById(baseStudent.id)).toBeTruthy();
		expect(service.getStudentById('id-falso')).toBeUndefined();
	});
});