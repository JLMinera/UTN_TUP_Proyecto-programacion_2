import TemporadaError from "../clasesDeError/TemporadaError";

export default abstract class Temporada {
    protected fechaInicio!: Date;
    protected fechaFin!: Date;
    protected recargo!: number;

    constructor(fechaInicio: Date, fechaFin: Date, recargo: number) {
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
        this.setRecargo(recargo);

        this.fechaInicio.setHours(0, 0, 0, 0);
        this.fechaFin.setHours(23, 59, 59, 999);
    }

    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new TemporadaError("La fecha de inicio no es válida");
        }
        this.fechaInicio = data;
    }

    public setFechaFin(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new TemporadaError("La fecha de fin no es válida");
        }
        if (this.fechaInicio && data <= this.fechaInicio) {
            throw new TemporadaError("La fecha de fin debe ser posterior a la fecha de inicio");
        }
        this.fechaFin = data;
    }

    public setRecargo(data: number): void {
        if (!Number.isFinite(data) || data < 0) {
            throw new TemporadaError("El recargo debe ser un número mayor o igual a 0");
        }
        this.recargo = data;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public getRecargo(): number {
        return this.recargo;
    }

    public reservaEnTemporada(fechaReserva: Date): boolean {
        if (isNaN(fechaReserva.getTime())) {
            throw new TemporadaError("La fecha de reserva no es válida");
        }
        return fechaReserva >= this.fechaInicio && fechaReserva <= this.fechaFin;
    }
}
