export default abstract class Temporada {
    protected fechaInicio: Date;
    protected fechaFin: Date;
    protected recargo: number;

    constructor(fechaInicio: Date, fechaFin: Date, recargo: number) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.recargo = recargo;

        this.fechaInicio.setHours(0, 0, 0, 0);
        this.fechaFin.setHours(23, 59, 59, 999);
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

    public setFechaInicio(data: Date) {
        this.fechaInicio = data;
    }

    public setFechaFin(data: Date) {
        this.fechaFin = data;
    }

    public setRecargo(data: number) {
        this.recargo = data;
    }

    public reservaEnTemporada(fechaReserva: Date): boolean {
        return (fechaReserva >= this.fechaInicio && fechaReserva <= this.fechaFin);
    }

    public recargoPorTemporada(tarifaBase: number): number {
        return tarifaBase * this.recargo;
    }
}