import Disponible from "../src/clases/Estados/Disponible";
import Vehiculo from "../src/clases/Vehiculos/Vehiculo";
import DisponibleError from "../src/clasesDeError/DisponibleError";

describe("Tests de la clase Disponible", () => {
    let disponible: Disponible;
    let vehiculo: Vehiculo;

    beforeEach(() => {
        const fechaInicio = new Date("2025-01-01");
        const fechaFin = new Date("2025-01-10");
        disponible = new Disponible(fechaInicio, fechaFin);

        vehiculo = {
            getPatente: () => "ABC123",
            getKilometraje: () => 1000,
            setPatente: jest.fn(),
            setKilometraje: jest.fn(),
        } as unknown as Vehiculo;
    });

    test("Debe crear la instancia con fechas correctas", () => {
        expect(disponible.getFechaInicio()).toEqual(new Date("2025-01-01"));
        expect(disponible.getFechaFin()).toEqual(new Date("2025-01-10"));
    });

    test("Debe agregar y consultar vehículo correctamente", () => {
        disponible.agregarVehiculo("ABC123", vehiculo);
        expect(disponible.consultarEstado("ABC123")).toBe(true);
    });

    test("Debe quitar vehículo correctamente", () => {
        disponible.agregarVehiculo("ABC123", vehiculo);
        expect(disponible.quitarVehiculo("ABC123")).toBe(true);
        expect(disponible.consultarEstado("ABC123")).toBe(false);
    });

    test("Debe lanzar error al quitar un vehículo que no existe", () => {
        expect(() => disponible.quitarVehiculo("XYZ999")).toThrow(DisponibleError);
        expect(() => disponible.quitarVehiculo("XYZ999")).toThrow(
            "No se encontró ningún vehículo con patente XYZ999 para eliminar."
        );
    });

    test("Debe lanzar error al agregar un vehículo inválido", () => {
        expect(() => disponible.agregarVehiculo("DEF456", null as unknown as Vehiculo)).toThrow(DisponibleError);
        expect(() => disponible.agregarVehiculo("DEF456", undefined as unknown as Vehiculo)).toThrow(DisponibleError);
    });
});
