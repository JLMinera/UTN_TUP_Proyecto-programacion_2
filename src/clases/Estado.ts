import Vehiculo from "./Vehiculo";
import EstadoError from "../clasesDeError/EstadoError";

export default abstract class Estado {
    protected fechaInicio!: Date;
    protected fechaFin!: Date;

    constructor(fechaInicio: Date, fechaFin: Date) {
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
    }

    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
        if (this.fechaFin && data > this.fechaFin) {
            throw new EstadoError("La fecha de inicio no puede ser posterior a la fecha de fin");
        }
        this.fechaInicio = data;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public setFechaFin(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de fin no es válida");
        }
        if (this.fechaInicio && data < this.fechaInicio) {
            throw new EstadoError("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
        this.fechaFin = data;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public abstract getVehiculos(): Map<string, Vehiculo>;

    public abstract quitarVehiculo(patente: string): boolean;

    public abstract consultarEstado(patente: string): boolean;

    public abstract agregarVehiculo(patente: string, vehiculo: Vehiculo): void;
}
