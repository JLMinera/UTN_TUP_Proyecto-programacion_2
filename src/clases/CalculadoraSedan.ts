import CalculadoraDeTarifa from "./CalculadoraDeTarifa";
import GestorDeReserva from "./GestorDeReserva";

export default class CalculadoraSedan extends CalculadoraDeTarifa {
    
    constructor(reserva: GestorDeReserva){
        super (reserva)
    }
    public calcularTarifaTotal(): number{
        let tarifaFinal: number;
        tarifaFinal = (this.dias * (this.recargoTemporada * this.tarifaBase)) + (this.adicionalPorKm * this.kmRecorridos)

        return tarifaFinal
    }
}