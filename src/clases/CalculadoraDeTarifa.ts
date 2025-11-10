import GestorDeVehiculo from "./GestorDeVehiculo";
import CalculadoraError from "../clasesDeError/CalculadoraError";
export default abstract class CalculadoraDeTarifa {

    public abstract calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo:GestorDeVehiculo, recargoTemporada: number): number;


    protected diasTotales(fechaInicio: Date, fechaFin: Date): number {
    if (isNaN(fechaInicio.getTime())) {
        throw new CalculadoraError("Fecha de inicio no válida");
    }
    if (isNaN(fechaFin.getTime())) {
        throw new CalculadoraError("Fecha de fin no válida");
    }
    if (fechaFin < fechaInicio) {
        throw new CalculadoraError("La fecha de fin no puede ser anterior a la fecha de inicio");
    }

    const diferenciaMs = fechaFin.getTime() - fechaInicio.getTime();
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);
    return dias;
}
    public getDiasTotales(fechaInicio: Date, fechaFin: Date): number {
        return this.diasTotales(fechaInicio, fechaFin);
    }
}