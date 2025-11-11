import GestorDeReserva from "../clases/GestorDeReserva";
import GestorDeVehiculo from "../clases/GestorDeVehiculo";
import Reserva from "../clases/Reserva";
import Temporada from "../clases/Temporada";
import Cliente from "../clases/Cliente";
import obtenerTemporada from "./ObtenerTemporada";

export function instanciarReserva(vehiculo: GestorDeVehiculo, cliente:Cliente, fechaInicio:Date, fechaFin:Date ): GestorDeReserva{
    const temporada= obtenerTemporada(fechaInicio);
    
    const reserva= new Reserva(cliente, fechaInicio, fechaFin);

    const gestorReserva= new GestorDeReserva(vehiculo, reserva, temporada);

    return gestorReserva
    }