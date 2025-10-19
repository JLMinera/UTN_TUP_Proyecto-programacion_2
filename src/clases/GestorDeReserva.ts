import Cliente from "./Cliente"
import Vehiculo from "./Vehiculo"
import Temporada from "./Temporada"

export default class GestorDeReserva {
    private kilometrajeInicial: number;
    private kilometrajeFinal: number;
    private distanciaRecorrida: number;
    private vehiculo: Vehiculo;
    private cliente: Cliente;
    private vehiculoDevuelto: boolean;
    private fechaInicio: Date;
    private fechaFin: Date;
    private temporada: Temporada;

    constructor(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kilometrajeInicial = vehiculo.getKilometraje();
        this.kilometrajeFinal = vehiculo.getKilometraje();
        this.distanciaRecorrida = this.kilometrajeFinal - this.kilometrajeInicial;
        this.vehiculoDevuelto = false;
        this.temporada = //Metodo para obtener la temporada;

    }

    public setKilometrajeInicial(data: number) {
        this.kilometrajeInicial = data;
    }

    public getKilometrajeInicial(): number {
        return this.kilometrajeInicial;
    }

    public setKilometrajeFinal(data: number) {
        this.kilometrajeFinal = data;
    }

    public getKilometrajeFinal(): number {
        return this.kilometrajeFinal;
    }

    public setDistanciaRecorrida(data: number) {
        this.distanciaRecorrida = data;
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(data: Cliente) {
        this.cliente = data;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public setVehiculo(data: Vehiculo) {
        this.vehiculo = data;
    }

    public getVehiculoDevuelto(): boolean {
        return this.vehiculoDevuelto;
    }

    public setFechaInicio(data: Date) {
        this.fechaInicio = data;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public setFechaFin(data: Date) {
        this.fechaFin = data;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public setTemporada(data: Temporada){
        this.temporada = data;
    }
    public getTemporada(): Temporada{
        return this.temporada;
    }

    public setVehiculoDevuelto() {
        this.vehiculoDevuelto = true;

        this.kilometrajeFinal = this.vehiculo.getKilometraje();
        this.distanciaRecorrida = this.kilometrajeFinal - this.kilometrajeInicial;
    }
}