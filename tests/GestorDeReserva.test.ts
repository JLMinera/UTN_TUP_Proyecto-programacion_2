import GestorDeReserva from "../src/clases/GestorDeReserva"
import Vehiculo from "../src/clases/Vehiculo";
import Cliente from "../src/clases/Cliente";

describe("Test clase GestorDeReserva", ( )=> {

    let gestorReserva: GestorDeReserva;
    const mockVehiculo: Vehiculo = { 
            getKilometraje: jest.fn().mockReturnValue(5000),
    } as unknown as Vehiculo;

    const mockCliente: Cliente = {

    } as unknown as Cliente;

    beforeEach(() => {
        gestorReserva = new GestorDeReserva(mockVehiculo, mockCliente);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo GestorDeReserva", () => {
        expect(gestorReserva).toBeInstanceOf(GestorDeReserva);
    });

    it("Debe devolver el kilometro inicial", () => {
        expect(gestorReserva.getKilometrajeInicial()).toEqual(5000);
    });

    it("Debe devolver el kilometro final", () => {
        expect(gestorReserva.getKilometrajeFinal()).toEqual(5000);
    });

    it("Debe devolver la distancia recorrida", () => {
        expect(gestorReserva.getDistanciaRecorrida()).toEqual(0);
    });

   /* it("Debe devolver el cliente asociado", () => {
        expect(gestorReserva.getCliente()).toBeInstanceOf(Cliente);
    });*/

    it("Debe devolver false si el vehiculo no fue devuelto", () => {
        expect(gestorReserva.getVehiculoDevuelto()).toEqual(false);
    });

    it("Debe establecer el kilometro inicial", () => {
        gestorReserva.setKilometrajeInicial(10000);

        expect(gestorReserva["kilometrajeInicial"]).toEqual(10000);
    });

    it("Debe establecer el kilometro final", () => {
        gestorReserva.setKilometrajeFinal(20000);

        expect(gestorReserva["kilometrajeFinal"]).toEqual(20000);
    });

    it("Debe establecer el la distancia recorrida", () => {
        gestorReserva.setDistanciaRecorrida(100000);

        expect(gestorReserva["distanciaRecorrida"]).toEqual(100000);
    });

    it("Debe establecer que el vehículo fue devuelto", () => {
        gestorReserva.setVehiculoDevuelto();

        expect(gestorReserva["vehiculoDevuelto"]).toEqual(true);
    });

    it("Debe manetener el mismo valor inicial de kilometraje", () => {
        gestorReserva.setVehiculoDevuelto();

        expect(gestorReserva["kilometrajeInicial"]).toEqual(5000);
    });

    it("Debe establecer un nuevo valor al kilometro final", () => {
        (mockVehiculo.getKilometraje as jest.Mock).mockReturnValue(10800);
        gestorReserva.setVehiculoDevuelto();

        expect(gestorReserva["kilometrajeFinal"]).toEqual(10800);
    });

  /*  it("Debe establecer un nuevo valor de distancia recorrida", () => {
        (mockVehiculo.getKilometraje as jest.Mock).mockReturnValue(10800);
        gestorReserva.setVehiculoDevuelto();

        expect(gestorReserva["distanciaRecorrida"]).toEqual(5800);
    });*/

});