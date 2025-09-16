import GestorDeReserva from "../src/clases/GestorDeReserva"

describe("Test clase GestorDeReserva", ( )=> {
    it("El constructor de la clase debe instanciar un objeto del tipo GestorDeReserva", () => {
        const gestorReserva = new GestorDeReserva(0, 0, 0);

        expect(gestorReserva).toBeInstanceOf(GestorDeReserva);
    });

    it("Debe devolver el kilometro inicial", () => {
        const gestorReserva = new GestorDeReserva(0, 10, 10);

        expect(gestorReserva.getKilometrajeInicial()).toEqual(10);
    });

    it("Debe devolver el kilometro final", () => {
        const gestorReserva = new GestorDeReserva(0, 10 , 10);

        expect(gestorReserva.getKilometrajeFinal()).toEqual(10);
    });

});