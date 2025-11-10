import Estado from "./Estado";

export default abstract class Vehiculo {

    protected patente: string;
    protected kilometraje: number;
 

    constructor(patente: string, kilometraje: number) {
        this.patente = patente;
        this.kilometraje = kilometraje;

    }

    public setPatente(data: string) {
        this.patente = data;
    }
    public getPatente(): string {
        return this.patente;
    }

    public setKilometraje(data: number) {
        this.kilometraje = data;
    }
    public getKilometraje(): number {
        return this.kilometraje;
    }

}