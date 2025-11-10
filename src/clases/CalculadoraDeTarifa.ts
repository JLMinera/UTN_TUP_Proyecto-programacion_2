import GestorDeVehiculo from "./GestorDeVehiculo";

export default abstract class CalculadoraDeTarifa {

    public abstract calcularTarifaTotal(fechaInicio: Date, fechaFin: Date, kmTotales: number, vehiculo:GestorDeVehiculo, recargoTemporada: number): number;


    protected diasTotales(fechaInicio: Date, fechaFin: Date): number {
        const diferenciaMs = fechaInicio.getTime() - fechaFin.getTime();
        const dias = diferenciaMs / (1000 * 60 * 60 * 24);
        return dias;
    }
}