import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeVehiculo from "../GestorDeVehiculo";

export default class CalculadoraSuv extends CalculadoraDeTarifa {

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