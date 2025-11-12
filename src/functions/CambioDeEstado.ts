import Estado from "../clases/Estados/Estado"
import GestorDeEstado from "../clases/GestorDeEstado"
import GestorDeReserva from "../clases/GestorDeReserva";
import GestorDeVehiculo from "../clases/GestorDeVehiculo";
import Mantenimiento from "../clases/Estados/Mantenimiento";
import NecesitaLimpieza from "../clases/Estados/NecesitaLimpieza";


export function instanciarMantenimiento(costo: number, fechaInicio: Date, fechaFin: Date, gestorDeVehiculo: GestorDeVehiculo, gestorDeReserva: GestorDeReserva): Mantenimiento{
    const mantenimiento = new Mantenimiento(costo, fechaInicio, fechaFin);
    gestorDeVehiculo.setFechaUltimoMantenimiento(mantenimiento.getFechaFin());
    gestorDeVehiculo.setUltimoKmMantenimiento(gestorDeReserva);
    //setear estado

    return mantenimiento;
}

export function instanciarNecesitaLimpieza(distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): NecesitaLimpieza{
    const necesitaLimpieza = new NecesitaLimpieza(distanciaRecorrida, fechaInicio, fechaFin);

    return necesitaLimpieza;
}

