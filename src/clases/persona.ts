export default abstract class Persona {

    protected nombre: string;
    protected apellido: string;
    protected dni: number;

    constructor(nombre: string, apellido: string, dni: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }

    public setNombre(data: string){
        this.nombre = data;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public setApellido(data: string){
        this.apellido = data;
    }

    public getApellido(): string{
        return this.apellido;
    }

    public setDni(data: number){
        this.dni = data;
    }

    public getDni(): number{
        return this.dni;
    }

}