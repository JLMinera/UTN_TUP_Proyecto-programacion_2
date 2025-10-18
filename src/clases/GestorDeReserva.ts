import Cliente from "./Cliente"
import Vehiculo from "./Vehiculo"

export default class GestorDeReserva {
    private kilometrajeInicial: number;
    private kilometrajeFinal: number;
    private distanciaRecorrida: number;
    private vehiculo: Vehiculo;
    private cliente: Cliente;
    private vehiculoDevuelto: boolean;

    constructor(vehiculo: Vehiculo, cliente: Cliente){
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.kilometrajeInicial = vehiculo.getKilometraje();
        this.kilometrajeFinal = vehiculo.getKilometraje();
        this.distanciaRecorrida = this.kilometrajeFinal-this.kilometrajeInicial;
        this.vehiculoDevuelto = false;

    }

    public setKilometrajeInicial(data: number){
        this.kilometrajeInicial = data;
    }

    public getKilometrajeInicial(): number {
        return this.kilometrajeInicial;
    }

    public setKilometrajeFinal(data: number){
        this.kilometrajeFinal = data;
    }

    public getKilometrajeFinal(): number {
        return this.kilometrajeFinal;
    }

    public setDistanciaRecorrida(data: number){
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

    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }

    public setVehiculo(data: Vehiculo) {
        this.vehiculo = data;
    }

    public getVehiculoDevuelto(): boolean {
        return this.vehiculoDevuelto;
    }

    public setVehiculoDevuelto() {
        this.vehiculoDevuelto = true;

        this.kilometrajeFinal = this.vehiculo.getKilometraje();
        this.distanciaRecorrida = this.kilometrajeFinal - this.kilometrajeInicial;
    }
}