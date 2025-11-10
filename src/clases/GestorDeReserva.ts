import Cliente from "./Cliente"
import Vehiculo from "./Vehiculo"
import Temporada from "./Temporada"
import GestorDeVehiculo from "./GestorDeVehiculo";

export default class GestorDeReserva {
    private kilometrajeInicial: number;
    private kilometrajeFinal: number;
    private distanciaRecorrida: number;
    private vehiculo: GestorDeVehiculo;
    private cliente: Cliente;
    private vehiculoDevuelto: boolean;
    private fechaInicio: Date;
    private fechaFin: Date;
    //REVISAR LA TEMPORADA LE PONGO STRING PARA ASIGNAR VALOR Y QUE NO ROMPA)
    private temporada: Temporada;
    private tarifaFinal: number;

    constructor(vehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date, temporada: Temporada) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kilometrajeInicial = vehiculo.getKilometrajeActual();
        this.kilometrajeFinal = vehiculo.getKilometrajeActual();
        this.distanciaRecorrida = this.kilometrajeFinal - this.kilometrajeInicial;
        this.vehiculoDevuelto = false;
        this.temporada = temporada;//Metodo para obtener la temporada;
        this.tarifaFinal = -1;
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

    public getVehiculo(): GestorDeVehiculo {
        return this.vehiculo;
    }

    public setVehiculo(data: GestorDeVehiculo) {
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

        this.kilometrajeFinal = this.vehiculo.getKilometrajeActual();
        this.distanciaRecorrida = this.kilometrajeFinal - this.kilometrajeInicial;
    }

    public tarifaFinalDeReserva(vehiculo: GestorDeVehiculo): number{
    let total: number = 0;
    total = vehiculo.getCalculadora().calcularTarifaTotal(this.getFechaInicio(), this.getFechaFin(), this.getDistanciaRecorrida(), this.getVehiculo(), this.getTemporada().getRecargo())
    return total;
    }

}