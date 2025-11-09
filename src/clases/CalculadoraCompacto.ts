import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeReserva from "./GestorDeReserva";

export default class CalculadoraCompacto extends CalculadoraDeTarifa {
    
    constructor(reserva: GestorDeReserva){
        super (reserva)
    }
    public calcularTarifaTotal(): number{
        let tarifaFinal: number;
        tarifaFinal = tarifaFinal = (this.dias * (this.recargoTemporada * this.tarifaBase));

        if ((this.kmRecorridos/this.dias) > this.reserva.getVehiculo().getLimiteDiarioKm()) {
            tarifaFinal = tarifaFinal + (this.adicionalPorKm * this.kmRecorridos)
        }
        return tarifaFinal
    }
}