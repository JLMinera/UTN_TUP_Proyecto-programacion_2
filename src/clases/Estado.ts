import Vehiculo from "./Vehiculo";

export default abstract class Estado {
    protected fechaInicio: Date;
    protected fechaFin: Date;

    constructor(fechaInicio: Date, fechaFin: Date) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public setFechaInicio(data: Date): void {
        this.fechaInicio = data;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public setFechaFin(data: Date): void {
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
