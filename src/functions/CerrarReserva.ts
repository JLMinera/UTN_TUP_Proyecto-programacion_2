import GestorDeReserva from "../clases/GestorDeReserva"


export function cerrarReserva(gestorReserva: GestorDeReserva): void {

    gestorReserva.setVehiculoDevuelto()

    gestorReserva.setCostoTotal(gestorReserva.tarifaFinalDeReserva())

}