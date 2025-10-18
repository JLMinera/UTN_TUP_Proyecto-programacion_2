import Estado from "./Estado";

export default abstract class Vehiculo{

    protected patente: string;
    protected kilometraje: number;
    protected tarifaBase: number;

    constructor (patente: string, kilometraje: number, tarifaBase: number){
        this.patente = patente;
        this.kilometraje = kilometraje;
        this.tarifaBase = tarifaBase;
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

}