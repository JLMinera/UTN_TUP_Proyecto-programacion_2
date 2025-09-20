export default abstract class Estado {

    protected fechaInicio: number;
    protected fechaFin: number;

    constructor(fechaInicio: number, fechaFin: number){
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public setFechaInicio(data: number): void{
        this.fechaInicio = data;
    }

    public getFechaInicio(): number{
        return this.fechaInicio;
    }

    public setFechaFin(data: number): void{
        this.fechaFin = data;
    }

    public getFechaFin(): number{
        return this.fechaFin;
    }
}