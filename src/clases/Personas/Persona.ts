import PersonaError from "../../clasesDeError/PersonaError";

export default abstract class Persona {

    protected nombre!: string;
    protected apellido!: string;
    protected dni!: number;

    constructor(nombre: string, apellido: string, dni: number) {
            this.setNombre(nombre);
            this.setApellido(apellido);
            this.setDni(dni);
    }

    public setNombre(data: string) {
        if (!data) {
            throw new PersonaError("El nombre no puede estar vacio")
        }
        this.nombre = data;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setApellido(data: string) {
        if (!data) {
            throw new PersonaError("El apellido no puede estar vacio")
        }
        this.apellido = data;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public setDni(data: number) {
        if (!Number.isInteger(data) || data <= 0) {
            throw new PersonaError("El DNI no puede estar vacio y debe ser un numero positivo")
        }
        this.dni = data;
    }

    public getDni(): number {
        return this.dni;
    }

}