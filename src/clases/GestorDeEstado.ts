import Estado from "./Estado";
import GestorDeVehiculo from "./GestorDeVehiculo";
import Vehiculo from "./Vehiculo";

export default class GestorDeEstado {
    public consultarEstado(patente: string, estado: Estado): boolean {
        return estado.consultarEstado(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo, estado: Estado): void {
        estado.agregarVehiculo(patente, vehiculo);
    }

    public quitarVehiculo(patente: string, estado: Estado): boolean {
        return estado.quitarVehiculo(patente);
    }

    public actualizarFechaMantenimiento(fecha: Date): Date {
        return fecha;
    }

    public disparadorMantenimiento(gestorVehiculo: GestorDeVehiculo): boolean {
        const ultimoMantenimientoKm = gestorVehiculo.getKilometrajeActual() - gestorVehiculo.getUltimoKmMantenimiento();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - gestorVehiculo.getFechaUltimoMantenimiento().getFullYear()) * 12
            + (fechaActual.getMonth() - gestorVehiculo.getFechaUltimoMantenimiento().getMonth());
        const alquileres = gestorVehiculo.getContadorAcumulado() % 5;

        if (ultimoMantenimientoKm > 10000 || meses > 12 || alquileres === 0) {
            return true;
        }

        return false;
    }
}
