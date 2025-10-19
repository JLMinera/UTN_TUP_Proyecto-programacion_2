import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeReserva from "./GestorDeReserva";

export default class CalculadoraSuv extends CalculadoraDeTarifa {
    private seguro: number;

    constructor(reserva: GestorDeReserva) {
        super(reserva)
        this.seguro = this.reserva.getVehiculo().getSeguro();
    }

    public calcularTarifaTotal(): number {
        let tarifaFinal: number;

        tarifaFinal = (this.dias * (this.recargoTemporada * this.tarifaBase)) + (this.seguro * this.dias);

        if (this.kmRecorridos > this.reserva.getVehiculo().getLimiteDiarioKm()) {
            tarifaFinal = tarifaFinal + (this.adicionalPorKm * this.kmRecorridos)
        }

        return tarifaFinal
    }
}