import NecesitaLimpieza from "../src/clases/NecesitaLimpieza";
import Vehiculo from "../src/clases/Vehiculo";
import NecesitaLimpiezaError from "../src/clasesDeError/NecesitaLimpiezaError";

class VehiculoTest extends Vehiculo {}

describe("tests de la clase NecesitaLimpieza", () => {
    let necesitaLimpieza: NecesitaLimpieza;
    let vehiculo: VehiculoTest;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        vehiculo = new VehiculoTest("XYZ123", 1000);
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-10");
        necesitaLimpieza = new NecesitaLimpieza(500, fechaInicio, fechaFin);
    });

    test("Debe setear y devolver distancia recorrida", () => {
        necesitaLimpieza.setDistanciaRecorrida(600);
        expect(necesitaLimpieza.getDistanciaRecorrida()).toBe(600);
    });

    test("Debe devolver los vehículos correctamente", () => {
        necesitaLimpieza.agregarVehiculo("XYZ123", vehiculo);
        expect(necesitaLimpieza.getVehiculos().has("XYZ123")).toBe(true);
    });

    test("Debe eliminar un vehículo correctamente", () => {
        necesitaLimpieza.agregarVehiculo("XYZ123", vehiculo);
        const resultado = necesitaLimpieza.quitarVehiculo("XYZ123");
        expect(resultado).toBe(true);
        expect(necesitaLimpieza.getVehiculos().has("XYZ123")).toBe(false);
    });

    test("Debe lanzar error si se intenta eliminar un vehículo inexistente", () => {
        expect(() => necesitaLimpieza.quitarVehiculo("ABC999")).toThrow(Error);
    });

    test("Debe consultar estado correctamente", () => {
        necesitaLimpieza.agregarVehiculo("XYZ123", vehiculo);
        expect(necesitaLimpieza.consultarEstado("XYZ123")).toBe(true);
        expect(necesitaLimpieza.consultarEstado("ABC999")).toBe(false);
    });
});
