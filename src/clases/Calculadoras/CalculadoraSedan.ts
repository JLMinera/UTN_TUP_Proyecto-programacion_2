import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeVehiculo from "../GestorDeVehiculo";

/**
 * Calculadora para vehículos sedán.
 * Siempre cobra adicional por kilómetro, sin límite diario.
 */
export default class CalculadoraSedan extends CalculadoraDeTarifa {

    /**
     * Fórmula: (días × recargo × tarifaBase) + (adicionalPorKm × kmTotales).
     */
    public calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo: GestorDeVehiculo, recargoTemporada: number): number {
        let dias: number = this.diasTotales(fechaInicio, fechaFin);
        let tarifaFinal: number = 0;

        tarifaFinal = (dias * (recargoTemporada * vehiculo.getTarifaBase())) + (vehiculo.getAdicionalPorKm() * kmTotales)

        return tarifaFinal
    }
}