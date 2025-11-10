import Estado from "./Estado";
import GestorDeVehiculo from "./GestorDeVehiculo";
import Mantenimiento from "./Mantenimiento";
import Vehiculo from "./Vehiculo";

export default class GestorDeEstado {
    private mantenimiento: Mantenimiento;

    constructor(mantenimiento: Mantenimiento) {
        this.mantenimiento = mantenimiento;
    }

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

    public disparadorMantenimiento(patente: string, gestorVehiculo: GestorDeVehiculo, estado: Mantenimiento): boolean {
        const vehiculo = gestorVehiculo.getVehiculo();
        const ultimoMantenimientoSuperado = gestorVehiculo.getKilometrajeActual() - this.mantenimiento.getUltimoMantenimientoKm();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - this.mantenimiento.getUltimoMantenimientoFecha().getFullYear()) * 12
                    + (fechaActual.getMonth() - this.mantenimiento.getUltimoMantenimientoFecha().getMonth());
        const alquileres = gestorVehiculo.getContadorAcumulado();

        if (ultimoMantenimientoSuperado > 0 || meses > 12 || alquileres > 5) {
            this.agregarVehiculo(patente, vehiculo, estado);
            return true;
        }

        return false;
    }

    public gestorDevolucionDeVehiculo(patente: string, vehiculo: Vehiculo, estado: Mantenimiento): void {
        if (this.disparadorMantenimiento(patente, vehiculo as unknown as GestorDeVehiculo, estado)) {
            this.agregarVehiculo(patente, vehiculo, estado);
        } else {
            this.agregarVehiculo(patente, vehiculo, estado);
        }
    }
}
