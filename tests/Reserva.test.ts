import Reserva from "../src/clases/Estados/Reserva";
import Cliente from "../src/clases/Personas/Cliente";
import Vehiculo from "../src/clases/Vehiculos/Vehiculo";
import ReservaError from "../src/clasesDeError/ReservaError";

class VehiculoTest extends Vehiculo {
    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje);
    }
}

describe("Test de la clase Reserva", () => {
    let reserva: Reserva;
    let cliente: Cliente;
    let vehiculo: VehiculoTest;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Pérez", 12345678);
        reserva = new Reserva(cliente, new Date("2025-01-01"), new Date("2025-01-10"));
        vehiculo = new VehiculoTest("ABC123", 10000);
    });

    test("Debe instanciar una reserva correctamente", () => {
        expect(reserva).toBeInstanceOf(Reserva);
        expect(reserva.getCliente()).toBe(cliente);
        expect(reserva.getFechaInicio()).toEqual(new Date("2025-01-01"));
        expect(reserva.getFechaFin()).toEqual(new Date("2025-01-10"));
    });

    test("Agregar un vehículo correctamente", () => {
        reserva.agregarVehiculo(vehiculo.getPatente(), vehiculo);
        expect(reserva.getVehiculos().has(vehiculo.getPatente())).toBe(true);
        expect(reserva.getVehiculos().get(vehiculo.getPatente())).toBe(vehiculo);
    });

    test("Agregar un vehículo inválido lanza ReservaError", () => {
        expect(() => reserva.agregarVehiculo("", vehiculo)).toThrow(ReservaError);
        expect(() => reserva.agregarVehiculo("XYZ999", null as any)).toThrow(ReservaError);
    });

    test("Quitar un vehículo correctamente", () => {
        reserva.agregarVehiculo(vehiculo.getPatente(), vehiculo);
        const resultado = reserva.quitarVehiculo(vehiculo.getPatente());
        expect(resultado).toBe(true);
        expect(reserva.getVehiculos().has(vehiculo.getPatente())).toBe(false);
    });

    test("Quitar un vehículo que no existe lanza ReservaError", () => {
        expect(() => reserva.quitarVehiculo("XYZ999")).toThrow(ReservaError);
    });

    test("Consultar estado de un vehículo agregado y no agregado", () => {
        reserva.agregarVehiculo(vehiculo.getPatente(), vehiculo);
        expect(reserva.consultarEstado(vehiculo.getPatente())).toBe(true);
        expect(reserva.consultarEstado("XYZ999")).toBe(false);
    });
});
