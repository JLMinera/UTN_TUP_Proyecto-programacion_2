import GestorVehiculo from "../clases/GestorDeVehiculo"

export default interface EstadoVehiculo {
    enviarDisponible(gestorVehiculo: GestorVehiculo): void;
    enviarReservar(gestorVehiculo: GestorVehiculo): void;
    disparadorMantenimiento(gestorVehiculo: GestorVehiculo): void;
}