import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeVehiculo from "../Gestores/GestorDeVehiculo";

/**
 * Calculadora para vehículos SUV.
 * Aplica seguro diario y cobra adicional por km solo si excede el límite total (no diario).
 */
export default class CalculadoraSuv extends CalculadoraDeTarifa {

    /**
     * Fórmula: (días × recargo × tarifaBase) + (seguro × días) + adicional si excede límite.
     */
    public calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo: GestorDeVehiculo, recargoTemporada: number): number {
        let dias: number = this.diasTotales(fechaInicio, fechaFin);
        let tarifaFinal: number;
        tarifaFinal = (dias * (recargoTemporada * vehiculo.getTarifaBase())) + (vehiculo.getSeguro() * dias);

        if (kmTotales > vehiculo.getLimiteDiarioKm()) {
            tarifaFinal = tarifaFinal + (vehiculo.getAdicionalPorKm() * kmTotales)
        }
        return tarifaFinal
    }
}