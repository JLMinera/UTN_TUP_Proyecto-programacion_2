import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeVehiculo from "../GestorDeVehiculo";

/**
 * Calculadora para vehículos compactos.
 * Solo cobra adicional por km si el promedio diario excede el límite.
 */
export default class CalculadoraCompacto extends CalculadoraDeTarifa {

    /**
     * Fórmula: (días × recargo × tarifaBase) + adicional si (kmTotales/días) > límiteDiario.
     */
    public calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo: GestorDeVehiculo, recargoTemporada: number): number {
        let dias: number = this.diasTotales(fechaInicio, fechaFin);
        let tarifaFinal: number = 0;
        tarifaFinal = tarifaFinal = (dias * (recargoTemporada * vehiculo.getTarifaBase()));

        if ((kmTotales / dias) > vehiculo.getLimiteDiarioKm()) {
            tarifaFinal = tarifaFinal + (vehiculo.getAdicionalPorKm() * kmTotales)
        }
        return tarifaFinal
    }
}