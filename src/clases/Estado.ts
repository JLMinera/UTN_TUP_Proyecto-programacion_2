import Vehiculo from "./Vehiculo";

export default abstract class Estado {

    protected vehiculos: Map<Vehiculo, string> = new Map;

    constructor() {

    }

    agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.set(vehiculo, vehiculo.getPatente());
    }


    eliminarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.delete(vehiculo);
    }

    obtenerVehiculo(patente: string): Vehiculo | undefined {
        for (const [vehiculo, pat] of this.vehiculos.entries()) {
            if (pat === patente) {
                return vehiculo;
            }
        }
        return undefined;
    }

    listarVehiculos(): Vehiculo[] {
        return Array.from(this.vehiculos.keys());
    }

}