import GestorVehiculo from "../clases/GestorDeVehiculo"
import Cliente from "../clases/Personas/Cliente";

export default interface EstadoVehiculo {
    enviarDisponible(gestorVehiculo: GestorVehiculo): void;
    enviarReservar(gestorVehiculo: GestorVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void;
    enviarMantenimiento(gestorVehiculo: GestorVehiculo, costo: number, fechaInicio: Date, fechaFin: Date): void;
    enviarNecesitaLimpieza(gestorVehiculo: GestorVehiculo, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void;
}