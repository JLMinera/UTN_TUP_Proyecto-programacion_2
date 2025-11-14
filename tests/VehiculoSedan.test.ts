import Sedan from "../src/clases/Vehiculos/VehiculoSedan";
import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Test Sedan (hereda de Vehiculo)", () => {

    let sedan: Sedan;

    beforeEach(() => {
        sedan = new Sedan("ABC123", 1500);
    });

    it("Debe instanciar correctamente un Sedan con valores válidos", () => {
        expect(sedan.getPatente()).toBe("ABC123");
        expect(sedan.getKilometraje()).toBe(1500);
    });

    it("Debe lanzar un error si la patente está vacía", () => {
        expect(() => sedan.setPatente("")).toThrow(VehiculoError);
        expect(() => sedan.setPatente("")).toThrow("La patente no puede estar vacía");

        expect(() => sedan.setPatente("   ")).toThrow(VehiculoError);
        expect(() => sedan.setPatente("   ")).toThrow("La patente no puede estar vacía");
    });

    it("Debe asignar la patente correctamente si el valor es válido", () => {
        sedan.setPatente("XYZ987");
        expect(sedan.getPatente()).toBe("XYZ987");
    });

    it("Debe lanzar un error si el kilometraje es negativo", () => {
        expect(() => sedan.setKilometraje(-1)).toThrow(VehiculoError);
        expect(() => sedan.setKilometraje(-1)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });

    it("Debe lanzar un error si el kilometraje no es un número finito", () => {
        expect(() => sedan.setKilometraje(NaN)).toThrow(VehiculoError);
        expect(() => sedan.setKilometraje(NaN)).toThrow("El kilometraje debe ser un número mayor o igual a 0");

        expect(() => sedan.setKilometraje(Infinity)).toThrow(VehiculoError);
        expect(() => sedan.setKilometraje(Infinity)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });

    it("Debe asignar el kilometraje correctamente si el valor es válido", () => {
        sedan.setKilometraje(3200);
        expect(sedan.getKilometraje()).toBe(3200);
    });
});
