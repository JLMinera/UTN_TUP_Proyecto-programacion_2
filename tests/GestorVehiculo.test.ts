jest.mock("../src/clases/GestorDeEstado", () => ({
    __esModule: true,
    default: {
        fechaFinMantenimiento: jest.fn(),
    },
}));
import GestorDeReserva from "../src/clases/GestorDeReserva";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo"
import GestorDeEstado from "../src/clases/GestorDeEstado";

import Vehiculo from "../src/clases/Vehiculo";
import GestorDeVehiculoError from "../src/clasesDeError/GestorDeVehiculoError";

describe("Test GestorDEVehiculo", () => {

    let gestorDeVehiculo: GestorDeVehiculo;
    let mockVehiculo: jest.Mocked<Vehiculo>


    beforeEach(() => {
        jest.clearAllMocks();
        mockVehiculo = {} as jest.Mocked<Vehiculo>;
        gestorDeVehiculo = new GestorDeVehiculo(mockVehiculo);
    })

    it("Debe lanzar un error si el kilometraje es inválido", () => {
        const mockGestorDeReserva = {
            getKilometrajeFinal: jest.fn().mockReturnValue(-50)
        } as unknown as GestorDeReserva;

        expect(() => {
            gestorDeVehiculo.setUltimoKmMantenimiento(mockGestorDeReserva);
        }).toThrow(GestorDeVehiculoError);

        expect(() => {
            gestorDeVehiculo.setUltimoKmMantenimiento(mockGestorDeReserva);
        }).toThrow("El valor del kilometraje obtenido es incorrecto");
    });

    it("Debe guardar la fecha si es correcta", () => {
        (GestorDeEstado.fechaFinMantenimiento as jest.Mock).mockReturnValue(new Date("2024-12-20"));

        gestorDeVehiculo.setFechaUltimoMantenimiento();

        expect(gestorDeVehiculo.getFechaUltimoMantenimiento()).toEqual(new Date("2024-12-20"));
        expect(GestorDeEstado.fechaFinMantenimiento).toHaveBeenCalledTimes(1);
    });

    it("Debe Lanzar error cuando la fecha es NaN", () => {
        (GestorDeEstado.fechaFinMantenimiento as jest.Mock).mockReturnValue(NaN);

        expect(() => gestorDeVehiculo.setFechaUltimoMantenimiento())
            .toThrow(GestorDeVehiculoError);
    });

    it("Debe sumar correctamente el contador", () => {
        gestorDeVehiculo.contadorAcumulado();
        gestorDeVehiculo.contadorAcumulado();
        expect(gestorDeVehiculo.getContadorAcumulado()).toEqual(2);
    });
});







