import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class NecesitaLimpieza extends Estado {
    private distanciaRecorrida: number;


    constructor(distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
        this.distanciaRecorrida = distanciaRecorrida;
    }


    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    public setDistanciaRecorrida(value: number): void {
        this.distanciaRecorrida = value;
    }
}
