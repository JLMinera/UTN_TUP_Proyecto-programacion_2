import Estado from "./Estado";

export default abstract class Vehiculo{

    protected patente: string;
    protected kilometraje: number;
    protected tarifaBase: number;
    public disponible: boolean;
    protected estado: Estado;

    constructor (patente: string, kilometraje: number, tarifaBase: number, disponible: boolean, estado: Estado){
        this.patente = patente;
        this.kilometraje = kilometraje;
        this.tarifaBase = tarifaBase;
        this.disponible = disponible;
        this.estado = estado;
    }

    

}