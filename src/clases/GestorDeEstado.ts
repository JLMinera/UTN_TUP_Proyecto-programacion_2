import Estado from "./Estado";
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

    public disparadorMantenimiento(patente: string, vehiculo: Vehiculo, estado: Mantenimiento): boolean {
        let ultimoMantenimientoSuperado = vehiculo.getKilometraje() - this.mantenimiento.getUltimoMantenimientoKm();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - fechaActual.getFullYear()) * 12 + (fechaActual.getMonth() - this.mantenimiento.getUltimoMantenimientoFecha().getMonth());
        const alquileres = vehiculo.getCantidadAlquileres();

        if (ultimoMantenimientoSuperado || meses > 12 || alquileres > 5) {
            this.agregarVehiculo(patente, vehiculo, estado);
            return true;
        }

        return false;
    }

    // apenas se devuelve el vehiculo, se hace una validacion sobre su posible siguiente estado
    public gestorDevolucionDeVehiculo(patente: string, vehiculo: Vehiculo, estado: Mantenimiento): void {
        if (this.disparadorMantenimiento(patente, vehiculo, estado)) {
            this.agregarVehiculo(patente, vehiculo, estado);
        } else {
            this.agregarVehiculo(patente, vehiculo, estado);
        }
    }
}

