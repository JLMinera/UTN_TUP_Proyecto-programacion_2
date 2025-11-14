import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeVehiculo from "../GestorDeVehiculo";

export default class CalculadoraCompacto extends CalculadoraDeTarifa {

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