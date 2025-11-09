jest.mock("../src/clases/GestorDeEstado", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            actualizarFechaMantenimiento: jest.fn(),
        })),
    };
});

import GestorDeReserva from "../src/clases/GestorDeReserva";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import GestorDeEstado from "../src/clases/GestorDeEstado";
import Vehiculo from "../src/clases/Vehiculo";
import GestorDeVehiculoError from "../src/clasesDeError/GestorDeVehiculoError";

describe("Test GestorDeVehiculo", () => {
    let gestorDeVehiculo: GestorDeVehiculo;
    let mockVehiculo: jest.Mocked<Vehiculo>;
    let mockGestorDeEstado: any;

    beforeEach(() => {
        jest.clearAllMocks();
        mockVehiculo = {} as jest.Mocked<Vehiculo>;

        mockGestorDeEstado = new (GestorDeEstado as jest.Mock)();
        (GestorDeEstado as jest.Mock).mockReturnValue(mockGestorDeEstado);

        gestorDeVehiculo = new GestorDeVehiculo(mockVehiculo);
        (gestorDeVehiculo as any).estado = mockGestorDeEstado;
    });

    it("Debe lanzar un error si el kilometraje es inválido", () => {
        const mockGestorDeReserva = {
            getKilometrajeFinal: jest.fn().mockReturnValue(-50),
        } as unknown as GestorDeReserva;

        expect(() => {
            gestorDeVehiculo.setUltimoKmMantenimiento(mockGestorDeReserva);
        }).toThrow(GestorDeVehiculoError);

        expect(() => {
            gestorDeVehiculo.setUltimoKmMantenimiento(mockGestorDeReserva);
        }).toThrow("El valor del kilometraje obtenido es incorrecto");
    });

    it("Debe guardar la fecha si es correcta", () => {
        mockGestorDeEstado.actualizarFechaMantenimiento.mockReturnValue(
            new Date("2024-12-20")
        );

        gestorDeVehiculo.setFechaUltimoMantenimiento(new Date("2024-12-20"));

        expect(gestorDeVehiculo.getFechaUltimoMantenimiento()).toEqual(
            new Date("2024-12-20")
        );
        expect(mockGestorDeEstado.actualizarFechaMantenimiento).toHaveBeenCalledTimes(1);
    });

    it("Debe lanzar error cuando la fecha es NaN", () => {
        mockGestorDeEstado.actualizarFechaMantenimiento.mockReturnValue(NaN);

        expect(() =>
            gestorDeVehiculo.setFechaUltimoMantenimiento(new Date("2024-12-20"))
        ).toThrow(GestorDeVehiculoError);
    });

    it("Debe sumar correctamente el contador", () => {
        gestorDeVehiculo.contadorAcumulado();
        gestorDeVehiculo.contadorAcumulado();
        expect(gestorDeVehiculo.getContadorAcumulado()).toEqual(2);
    });
});



