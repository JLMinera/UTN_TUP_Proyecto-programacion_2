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

    public setPatente(data: string){
        this.patente = data;
    }
    public getPatente(): string{
        return this.patente;
    }
    
    public setKilometraje(data: number){
        this.kilometraje = data;
    }
    public getKilometraje(): number{
        return this.kilometraje;
    }
    
    public setTarifaBase(data: number){
        this.tarifaBase = data;
    }
    public getTarifaBase(): number{
        return this.tarifaBase;
    }

    public setDisponible(data: boolean){
        this.disponible = data;
    }
    public getDisponible() {
        return this.disponible
    }

    public setEstado(data: Estado){
        this.estado = data;
    }
    public getEstado(){
        return this.estado;
    }

}