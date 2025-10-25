import Disponible from "./Disponible";
import Mantenimiento from "./Mantenimiento";
import NecesitaLimpieza from "./NecesitaLimpieza";
import Reserva from "./Reserva";
import Vehiculo from "./Vehiculo";

export default class GestorDeEstado {

    private disponible: Disponible;
    private mantenimiento: Mantenimiento;
    private necesitaLimpieza: NecesitaLimpieza;
    private enAlquiler: Reserva;

    constructor(disponible: Disponible, mantenimiento: Mantenimiento, necesitaLimpieza: NecesitaLimpieza, enAlquiler: Reserva) {
        this.disponible = disponible;
        this.mantenimiento = mantenimiento;
        this.necesitaLimpieza = necesitaLimpieza;
        this.enAlquiler = enAlquiler;
    }

    /* public quitarVehiculo(patente: string): void {
        if (this.vehiculos.has(patente)) {
            this.vehiculos.delete(patente);
            console.log(`Vehículo con patente ${patente} eliminado correctamente.`);
        } else {
            throw new Error(`No se encontró ningún vehículo con patente ${patente} para eliminar.`);
        }
    }

    public consultarDisponibilidad(vehiculo: Vehiculo): boolean {
        return this.disponible.getVehiculos().has(vehiculo.getPatente());
    } */

    public disparadorMantenimiento(patente: string, vehiculo: Vehiculo): boolean {
        let ultimoMantenimientoSuperado = vehiculo.getKilometraje() - this.mantenimiento.getUltimoMantenimientoKm();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - fechaActual.getFullYear()) * 12 + (fechaActual.getMonth() - this.mantenimiento.getUltimoMantenimientoFecha().getMonth());
        const alquileres = vehiculo.getCantidadAlquileres();

        if (ultimoMantenimientoSuperado || meses > 12 || alquileres > 5) {
            this.setearEstadoMantenimiento(patente, vehiculo);
            return true;
        }

        return false;
    }

    //sera que se puede hacer un solo metodo a partir de los 4 siguientes?
    public setearEstadoMantenimiento(patente: string, vehiculo: Vehiculo): boolean {
        if (patente === vehiculo.getPatente()) {
            this.vehiculosEnMantenimiento.set(patente, vehiculo);
            return true;
        } else {
            throw new Error("Datos con inconsistencias");
        }
    }

    public setearEstadoDisponible(patente: string, vehiculo: Vehiculo): boolean {
        if (patente === vehiculo.getPatente()) {
            this.vehiculosDisponibles.set(patente, vehiculo);
            return true;
        } else {
            throw new Error("Datos con inconsistencias");
        }
    }

    // entiendo este metodo debe llamarse al momento de devolver el vehiculo
    public setearEstadoNecesitaLimpieza(patente: string, vehiculo: Vehiculo): boolean {
        if (patente === vehiculo.getPatente()) {
            this.vehiculosNecesitaLimpieza.set(patente, vehiculo);
            return true;
        } else {
            throw new Error("Datos con inconsistencias");
        }
    }

    // este metodo deberia llamarse en gestor de reserva, al momento de crear reserva
    public setearEstadoEnAlquiler(patente: string, vehiculo: Vehiculo): boolean {
        if (patente === vehiculo.getPatente()) {
            this.vehiculosEnAlquiler.set(patente, vehiculo);
            return true;
        } else {
            throw new Error("Datos con inconsistencias");
        }
    }

    // apenas se devuelve el vehiculo, se hace una validacion sobre su posible siguiente estado
    /* public gestorDevolucionDeVehiculo(patente: string, vehiculo: Vehiculo): void {
        if (this.disparadorMantenimiento(patente, vehiculo)) {
            this.setearEstadoMantenimiento(patente, vehiculo);
        } else {
            this.setearEstadoNecesitaLimpieza(patente, vehiculo);
        }
    } */
}

