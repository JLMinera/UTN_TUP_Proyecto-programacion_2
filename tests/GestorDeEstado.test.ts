import GestorDeEstado from "../src/clases/GestorDeEstado";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import Mantenimiento from "../src/clases/Mantenimiento";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoDummy extends Vehiculo {
    constructor() {
        super("ABC123", 1000);
    }
}

describe("Test de la clase GestorDeEstado", () => {
    let gestorEstado: GestorDeEstado;
    let mantenimientoMock: Mantenimiento;
    let vehiculoGestorMock: GestorDeVehiculo;
    let vehiculoDummy: VehiculoDummy;

    beforeEach(() => {
        vehiculoDummy = new VehiculoDummy();

        mantenimientoMock = {
            getUltimoMantenimientoKm: jest.fn().mockReturnValue(1000),
            getUltimoMantenimientoFecha: jest.fn().mockReturnValue(new Date()),
            agregarVehiculo: jest.fn(),
            consultarEstado: jest.fn()
        } as unknown as Mantenimiento;

        vehiculoGestorMock = {
            getKilometrajeActual: jest.fn().mockReturnValue(1000),
            getContadorAcumulado: jest.fn().mockReturnValue(0),
            getVehiculo: jest.fn().mockReturnValue(vehiculoDummy)
        } as unknown as GestorDeVehiculo;

        gestorEstado = new GestorDeEstado(mantenimientoMock);
    });

    test("disparadorMantenimiento devuelve false si no se supera mantenimiento", () => {
        (vehiculoGestorMock.getKilometrajeActual as jest.Mock).mockReturnValue(1000);
        (mantenimientoMock.getUltimoMantenimientoKm as jest.Mock).mockReturnValue(1000);
        (vehiculoGestorMock.getContadorAcumulado as jest.Mock).mockReturnValue(0);

        const resultado = gestorEstado.disparadorMantenimiento("ABC123", vehiculoGestorMock, mantenimientoMock);
        expect(resultado).toBe(false);
    });

    test("disparadorMantenimiento devuelve true si se supera kilometraje", () => {
        (vehiculoGestorMock.getKilometrajeActual as jest.Mock).mockReturnValue(1500);
        (mantenimientoMock.getUltimoMantenimientoKm as jest.Mock).mockReturnValue(1000);
        (vehiculoGestorMock.getContadorAcumulado as jest.Mock).mockReturnValue(0);

        const resultado = gestorEstado.disparadorMantenimiento("ABC123", vehiculoGestorMock, mantenimientoMock);
        expect(resultado).toBe(true);
    });

    test("disparadorMantenimiento devuelve true si se supera cantidad de alquileres", () => {
        (vehiculoGestorMock.getKilometrajeActual as jest.Mock).mockReturnValue(1000);
        (mantenimientoMock.getUltimoMantenimientoKm as jest.Mock).mockReturnValue(1000);
        (vehiculoGestorMock.getContadorAcumulado as jest.Mock).mockReturnValue(10);

        const resultado = gestorEstado.disparadorMantenimiento("ABC123", vehiculoGestorMock, mantenimientoMock);
        expect(resultado).toBe(true);
    });
});
