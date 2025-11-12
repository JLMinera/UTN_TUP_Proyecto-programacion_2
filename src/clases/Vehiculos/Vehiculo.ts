import VehiculoError from "../../clasesDeError/VehiculoError";

export default abstract class Vehiculo {

    protected patente!: string;
    protected kilometraje!: number;

    constructor(patente: string, kilometraje: number) {
        this.setPatente(patente);
        this.setKilometraje(kilometraje);
    }

    public setPatente(data: string): void {
        if (!data || data.trim() === "") {
            throw new VehiculoError("La patente no puede estar vacía");
        }
        this.patente = data;
    }

    public getPatente(): string {
        return this.patente;
    }

    public setKilometraje(data: number): void {
        if (!Number.isFinite(data) || data < 0) {
            throw new VehiculoError("El kilometraje debe ser un número mayor o igual a 0");
        }
        this.kilometraje = data;
    }

    public getKilometraje(): number {
        return this.kilometraje;
    }
}