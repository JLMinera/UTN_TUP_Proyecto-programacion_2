export default class GestorDeReserva {
    private kilometrajeInicial: number;
    private kilometrajeFinal: number;
    private distanciaRecorrida: number;

    constructor(kilometrajeInicial: number, kilometrajeFinal: number, distanciaRecorrida: number){
        this.kilometrajeInicial = kilometrajeInicial;
        this.kilometrajeFinal =  kilometrajeFinal;
        this.distanciaRecorrida = distanciaRecorrida;
    }

    public setKilometrajeInicial(kilometrajeInicial: number){
        this.kilometrajeInicial = kilometrajeInicial;
    }

    public getKilometrajeInicial(): number {
        return this.kilometrajeInicial;
    }

    public setKilometrajeFinal(kilometrajeFinal: number){
        this.kilometrajeFinal = kilometrajeFinal;
    }

    public getKilometrajeFinal(): number {
        return this.kilometrajeFinal;
    }

    public setDistanciaRecorrida(distanciaRecorrida: number){
        this.distanciaRecorrida = distanciaRecorrida;
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }
}