import Cliente from "./Cliente";
import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Reserva extends Estado {
    public cliente: Cliente;


    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
        this.cliente = cliente;
    }


    }
