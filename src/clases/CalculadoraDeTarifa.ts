import GestorDeReserva from "./GestorDeReserva";

export default abstract class CalculadoraDeTarifa {
    protected tarifaBase: number;
    protected dias: number;
    protected kmRecorridos: number;
    protected recargoTemporada: number;
    protected reserva: GestorDeReserva;
    protected adicionalPorKm: number;

    constructor(reserva: GestorDeReserva) {
        this.reserva = reserva;
        this.tarifaBase = this.reserva.getVehiculo().getTarifaBase();
        this.dias = this.diasTotales();
        this.kmRecorridos = this.reserva.getDistanciaRecorrida();
        this.recargoTemporada = this.reserva.getTemporada().getRecargo();
        this.adicionalPorKm = this.reserva.getVehiculo().getAdicionalPorKm();
    }

    public abstract calcularTarifaTotal(): number;

    public diasTotales(): number {
        const diferenciaMs = this.reserva.getFechaFin().getTime() - this.reserva.getFechaInicio().getTime();
        const dias = diferenciaMs / (1000 * 60 * 60 * 24);
        return dias;
    }

    public setTarifaBase(data: number): void {
        this.tarifaBase = data;
    }

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public setDias(data: number): void {
        this.dias = data;
    }

    public getDias(): number {
        return this.dias;
    }

    public setKmRecorridos(data: number): void {
        this.kmRecorridos = data;
    }

    public getKmRecorridos(): number {
        return this.kmRecorridos;
    }

    public setRecargoTemporada(data: number): void {
        this.recargoTemporada = data;
    }

    public getRecargoTemporada(): number {
        return this.recargoTemporada;
    }

    public setReserva(data: GestorDeReserva): void {
        this.reserva = data;
    }

    public getReserva(): GestorDeReserva {
        return this.reserva;
    }
}
