import TemporadaError from "../../clasesDeError/TemporadaError";

/**
 * Clase abstracta que representa una temporada dentro del sistema.
 * Una temporada define un rango de fechas y un recargo aplicado a 
 * las reservas que caen dentro de ese periodo.
 */
export default abstract class Temporada {
    
    /** Fecha de inicio de la temporada. */
    protected fechaInicio!: Date;
    
    /** Fecha de fin de la temporada. */
    protected fechaFin!: Date;
    
    /** Recargo aplicado durante esta temporada. */
    protected recargo!: number;

    /**
     * Crea una nueva temporada con fecha de inicio, fin y un recargo.
     * La fecha de inicio se normaliza al inicio del día (00:00:00)
     * y la de fin al final del día (23:59:59) para abarcar días completos.
     * 
     * @throws TemporadaError si alguna fecha es inválida o el recargo negativo.
     */
    constructor(fechaInicio: Date, fechaFin: Date, recargo: number) {
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
        this.setRecargo(recargo);

        // Normalización de rangos horarios
        this.fechaInicio.setHours(0, 0, 0, 0);
        this.fechaFin.setHours(23, 59, 59, 999);
    }

    /**
     * Establece la fecha de inicio de la temporada.
     * @throws TemporadaError si la fecha es inválida.
     */
    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new TemporadaError("La fecha de inicio no es válida");
        }
        this.fechaInicio = data;
    }

    /**
     * Establece la fecha de fin de la temporada.
     * Debe ser posterior a la fecha de inicio.
     * 
     * @throws TemporadaError si la fecha es inválida o previa a la fecha de inicio.
     */
    public setFechaFin(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new TemporadaError("La fecha de fin no es válida");
        }
        if (this.fechaInicio && data <= this.fechaInicio) {
            throw new TemporadaError("La fecha de fin debe ser posterior a la fecha de inicio");
        }
        this.fechaFin = data;
    }

    /**
     * Establece el recargo aplicado durante la temporada.
     * @throws TemporadaError si el recargo es negativo o no es numérico.
     */
    public setRecargo(data: number): void {
        if (!Number.isFinite(data) || data < 0) {
            throw new TemporadaError("La fecha de fin debe ser posterior a la fecha de inicio");
        }
        this.recargo = data;
    }

    /** @returns Fecha de inicio de la temporada. */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /** @returns Fecha de fin de la temporada. */
    public getFechaFin(): Date {
        return this.fechaFin;
    }

    /** @returns Recargo aplicado durante la temporada. */
    public getRecargo(): number {
        return this.recargo;
    }

    /**
     * Indica si una reserva cae dentro del rango de la temporada.
     * 
     * @param fechaReserva Fecha que se desea evaluar.
     * @returns true si está dentro del rango inclusivo; false si no.
     * @throws TemporadaError si la fecha proporcionada es inválida.
     */
    public reservaEnTemporada(fechaReserva: Date): boolean {
        if (isNaN(fechaReserva.getTime())) {
            throw new TemporadaError("La fecha de reserva no es válida");
        }
        return fechaReserva >= this.fechaInicio && fechaReserva <= this.fechaFin;
    }
}
