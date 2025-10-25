import Cliente from "./Cliente";
import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Reserva extends Estado {

    public cliente: Cliente;
    private static vehiculosEnReserva: Map<string, Vehiculo> = new Map();

    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cliente = cliente;
    }
}
