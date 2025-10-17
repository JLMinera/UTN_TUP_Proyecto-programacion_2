import Vehiculo from "./Vehiculo";

export default abstract class Estado {

    protected fechaInicio: Date;
    protected fechaFin: Date;
    protected vehiculos: Map<string, Vehiculo>;

    constructor(fechaInicio: Date, fechaFin: Date) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
    }

    public setFechaInicio(data: Date){
        this.fechaInicio = data;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public setFechaFin(data: Date){
        this.fechaFin = data;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.vehiculos.set(patente, vehiculo);
        console.log(`Vehículo con patente ${patente} agregado correctamente.`);
    }

    public quitarVehiculo(patente: string): void {
        if (this.vehiculos.has(patente)) {
            this.vehiculos.delete(patente);
            console.log(`Vehículo con patente ${patente} eliminado correctamente.`);
        } else {
            throw new Error(`No se encontró ningún vehículo con patente ${patente} para eliminar.`);
        }
    }

    public getVehiculos(): Map<string, Vehiculo> {
        if (this.vehiculos.size === 0) {
            throw new Error("No hay vehículos en el registro.");
        }
        return this.vehiculos;
    }

    public getVehiculo(patente: string): Vehiculo {
        const vehiculo = this.vehiculos.get(patente);
        if (!vehiculo) {
            throw new Error(`No se encontró ningún vehículo con la patente ${patente}`);
        }
        return vehiculo;
}
}
