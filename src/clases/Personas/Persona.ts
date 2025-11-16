import PersonaError from "../../clasesDeError/PersonaError";

/**
 * Clase base abstracta que representa a una persona dentro del sistema.
 * 
 * Esta clase define los atributos y validaciones comunes que compartirán
 * todas las clases que hereden de ella (Cliente, Empleado, etc.).
 * 
 * Atributos:
 *  - nombre: string
 *  - apellido: string
 *  - dni: number
 */
export default abstract class Persona {

    protected nombre!: string;
    protected apellido!: string;
    protected dni!: number;

    /**
     * El constructor recibe los datos obligatorios de una persona.
     * En lugar de asignar directamente, usa los setters para aprovechar
     * todas las validaciones ya implementadas.
     */
    constructor(nombre: string, apellido: string, dni: number) {
        this.setNombre(nombre);
        this.setApellido(apellido);
        this.setDni(dni);
    }

    /**
     * Setter del nombre.
     * 
     * Valida que:
     *  - El nombre no sea null, undefined ni cadena vacía.
     *  - No tenga solo espacios en blanco.
     * 
     * Si la validación falla, lanza PersonaError.
     */
    public setNombre(data: string): void {
        if (!data || data.trim() === "") {
            throw new PersonaError("El nombre no puede estar vacio");
        }
        this.nombre = data;
    }

    /**
     * Devuelve el nombre actual de la persona.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Setter del apellido.
     * 
     * Valida igual que el nombre:
     *  - Que no esté vacío ni compuesto solo por espacios.
     * 
     * Si la validación falla, lanza PersonaError.
     */
    public setApellido(data: string): void {
        if (!data || data.trim() === "") {
            throw new PersonaError("El apellido no puede estar vacio");
        }
        this.apellido = data;
    }

    /**
     * Devuelve el apellido de la persona.
     */
    public getApellido(): string {
        return this.apellido;
    }

    /**
     * Setter del DNI.
     * 
     * Valida que:
     *  - Sea un número entero.
     *  - Sea mayor que cero.
     * 
     * Esto evita DNIs vacíos, inválidos o valores como negativos,
     * decimales o NaN.
     * 
     * Si la validación falla, lanza PersonaError.
     */
    public setDni(data: number): void {
        if (!Number.isInteger(data) || data <= 0) {
            throw new PersonaError("El DNI no puede estar vacio y debe ser un numero positivo");
        }
        this.dni = data;
    }

    /**
     * Devuelve el DNI de la persona.
     */
    public getDni(): number {
        return this.dni;
    }
}