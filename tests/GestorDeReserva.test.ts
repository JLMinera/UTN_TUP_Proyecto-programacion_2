import GestorDeReserva from "../src/clases/GestorDeReserva"

describe("Test clase GestorDeReserva", ( )=> {
    it("El constructor de la clase debe instanciar un objeto del tipo GestorDeReserva", () => {
        const gestorReserva = new GestorDeReserva(0, 0, 0);

        expect(gestorReserva).toBeInstanceOf(GestorDeReserva);
    });

    it("Debe devolver el kilometro inicial", () => {
        const gestorReserva = new GestorDeReserva(0, 10, 10);

        expect(gestorReserva.getKilometrajeInicial()).toEqual(0);
    });

    it("Debe devolver el kilometro final", () => {
        const gestorReserva = new GestorDeReserva(0, 10 , 10);

        expect(gestorReserva.getKilometrajeFinal()).toEqual(10);
    });

    it("Debe devolver la distancia recorrida", () => {
        const gestorReserva = new GestorDeReserva(0, 10 , 10);

        expect(gestorReserva.getDistanciaRecorrida()).toEqual(10);
    });

    it("Debe establecer el kilometro inicial", () => {
        const gestorReserva = new GestorDeReserva(0,0,0);
        gestorReserva.setKilometrajeInicial(10);

        expect(gestorReserva["kilometrajeInicial"]).toEqual(10);
    });

    it("Debe establecer el kilometro final", () => {
        const gestorReserva = new GestorDeReserva(0,0,0);
        gestorReserva.setKilometrajeFinal(20);

        expect(gestorReserva["kilometrajeFinal"]).toEqual(20);
    });

    it("Debe establecer el la distancia recorrida", () => {
        const gestorReserva = new GestorDeReserva(0,0,0);
        gestorReserva.setDistanciaRecorrida(100);

        expect(gestorReserva["distanciaRecorrida"]).toEqual(100);
    });

});