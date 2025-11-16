import GestorDeVehiculo from "../Gestores/GestorDeVehiculo";
import CalculadoraError from "../../clasesDeError/CalculadoraError";

/**
 * Clase base para calcular tarifas de alquiler.
 * Cada tipo de vehículo implementa su propia lógica de cálculo.
 */
export default abstract class CalculadoraDeTarifa {

    /**
     * Calcula la tarifa total del alquiler según el tipo de vehículo.
     * @param recargoTemporada - Factor de recargo (ej: 1.2 para temporada alta)
     */
    public abstract calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo: GestorDeVehiculo, recargoTemporada: number): number;

    /**
     * Calcula días entre dos fechas. Si es el mismo día, retorna 1 (mínimo un día de alquiler).
     */
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
        let dias = diferenciaMs / (1000 * 60 * 60 * 24);
        if (dias === 0) {
            dias = 1;
        }
        return dias;
    }
    
    public getDiasTotales(fechaInicio: Date, fechaFin: Date): number {
        return this.diasTotales(fechaInicio, fechaFin);
    }
}