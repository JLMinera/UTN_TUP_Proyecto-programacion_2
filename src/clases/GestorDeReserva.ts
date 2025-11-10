import GestorDeReservaError from "../clasesDeError/GestorDeReservaError";
import Reserva from "./Reserva";
import Temporada from "./Temporada";
import GestorDeVehiculo from "./GestorDeVehiculo";
import Cliente from "./Cliente";

export default class GestorDeReserva {
    private kmInicial!: number;
    private kmFinal!: number;
    private vehiculo: GestorDeVehiculo;
    private vehiculoDevuelto: boolean = false;
    private reserva: Reserva;
    private temporada: Temporada;

    constructor(vehiculo: GestorDeVehiculo, reserva: Reserva, temporada: Temporada) {
        this.vehiculo = vehiculo;
        this.reserva = reserva;
        this.temporada = temporada;
        this.setKmInicial(vehiculo.getKilometrajeActual());
    }

    public setKmInicial(data: number) {
        if (data < 0) {
            throw new GestorDeReservaError("El kilometraje inicial no puede ser negativo");
        }
        this.kmInicial = data;
    }

    public getKmInicial(): number {
        return this.kmInicial;
    }

    public setKmFinal(data: number) {
        if (data < this.kmInicial) {
            throw new GestorDeReservaError("El kilometraje final no puede ser menor que el inicial");
        }
        this.kmFinal = data;
    }

    public getKmFinal(): number {
        return this.kmFinal;
    }

    public getDistanciaRecorrida(): number {
        if (this.kmFinal === undefined) {
            throw new GestorDeReservaError("El kilometraje final aún no fue registrado");
        }
        return this.kmFinal - this.kmInicial;
    }

    public getCliente(): Cliente {
        return this.reserva.getCliente();
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

    public getFechaInicio(): Date {
        return this.reserva.getFechaInicio();
    }

    public getFechaFin(): Date {
        return this.reserva.getFechaFin();
    }

    public setTemporada(data: Temporada) {
        this.temporada = data;
    }

    public getTemporada(): Temporada {
        return this.temporada;
    }

    public setVehiculoDevuelto(): void {
        if (this.vehiculoDevuelto) {
            throw new GestorDeReservaError("El vehículo ya fue devuelto");
        }
        this.vehiculoDevuelto = true;

        this.setKmFinal(this.vehiculo.getKilometrajeActual());
    }

    public tarifaFinalDeReserva(): number {
        if (!this.vehiculoDevuelto) {
            throw new GestorDeReservaError("No se puede calcular la tarifa antes de devolver el vehículo");
        }

        return this.vehiculo.getCalculadora().calcularTarifaTotal(
            this.getFechaInicio(),
            this.getFechaFin(),
            this.getDistanciaRecorrida(),
            this.getVehiculo(),
            this.getTemporada().getRecargo()
        );
    }
}
