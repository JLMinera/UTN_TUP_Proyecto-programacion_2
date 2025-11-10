import Mantenimiento from "../src/clases/Mantenimiento";
import Vehiculo from "../src/clases/Vehiculo";
import EstadoError from "../src/clasesDeError/EstadoError";

class VehiculoTest extends Vehiculo {}

describe("tests de la clase Mantenimiento", () => {
    let mantenimiento: Mantenimiento;
    let fechaInicio: Date;
    let fechaFin: Date;
    let vehiculo: VehiculoTest;

    beforeEach(() => {
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-10");
        vehiculo = new VehiculoTest("ABC123", 1000) as any;
        mantenimiento = new Mantenimiento(500, fechaInicio, fechaFin);
    });

    test("Debe setear y devolver fecha inicio", () => {
        const nuevaFechaInicio = new Date("2025-01-02");
        mantenimiento.setFechaInicio(nuevaFechaInicio);
        expect(mantenimiento.getFechaInicio()).toEqual(nuevaFechaInicio);
    });

    test("Debe setear y devolver fecha fin", () => {
        const nuevaFechaFin = new Date("2025-01-15");
        mantenimiento.setFechaFin(nuevaFechaFin);
        expect(mantenimiento.getFechaFin()).toEqual(nuevaFechaFin);
    });

    test("Debe lanzar error si fecha fin es anterior a fecha inicio", () => {
        const fechaInvalida = new Date("2024-12-31");
        expect(() => mantenimiento.setFechaFin(fechaInvalida)).toThrowError(EstadoError);
        expect(() => mantenimiento.setFechaFin(fechaInvalida)).toThrow("La fecha de fin no puede ser anterior a la fecha de inicio");
    });

    test("Debe setear y devolver costo", () => {
        mantenimiento.setCosto(750);
        expect(mantenimiento.getCosto()).toBe(750);
    });

    test("Debe agregar, consultar y quitar vehículos correctamente", () => {
        mantenimiento.agregarVehiculo("XYZ789", vehiculo);
        expect(mantenimiento.consultarEstado("XYZ789")).toBe(true);
        expect(mantenimiento.quitarVehiculo("XYZ789")).toBe(true);
        expect(mantenimiento.consultarEstado("XYZ789")).toBe(false);
    });

    test("getUltimoMantenimientoKm y getUltimoMantenimientoFecha devuelven valores", () => {
        expect(mantenimiento.getUltimoMantenimientoKm()).toBe(1);
        expect(mantenimiento.getUltimoMantenimientoFecha()).toBeInstanceOf(Date);
    });
});
