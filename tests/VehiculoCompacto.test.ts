import VehiculoCompacto from "../src/clases/Vehiculos/VehiculoCompacto";

import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Test Compacto (hereda de Vehiculo)", () => {

    let compacto: VehiculoCompacto;

    beforeEach(() => {
        compacto = new VehiculoCompacto("ABC123", 800);
    });

    it("Debe instanciar correctamente un Compacto con valores válidos", () => {
        expect(compacto.getPatente()).toBe("ABC123");
        expect(compacto.getKilometraje()).toBe(800);
    });

    it("Debe lanzar un error si la patente está vacía", () => {
        expect(() => compacto.setPatente("")).toThrow(VehiculoError);
        expect(() => compacto.setPatente("")).toThrow("La patente no puede estar vacía");

        expect(() => compacto.setPatente("   ")).toThrow(VehiculoError);
        expect(() => compacto.setPatente("   ")).toThrow("La patente no puede estar vacía");
    });

    it("Debe asignar la patente correctamente si el valor es válido", () => {
        compacto.setPatente("XYZ987");
        expect(compacto.getPatente()).toBe("XYZ987");
    });

    it("Debe lanzar un error si el kilometraje es negativo", () => {
        expect(() => compacto.setKilometraje(-1)).toThrow(VehiculoError);
        expect(() => compacto.setKilometraje(-1)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });

    it("Debe lanzar un error si el kilometraje no es un número finito", () => {
        expect(() => compacto.setKilometraje(NaN)).toThrow(VehiculoError);
        expect(() => compacto.setKilometraje(NaN)).toThrow("El kilometraje debe ser un número mayor o igual a 0");

        expect(() => compacto.setKilometraje(Infinity)).toThrow(VehiculoError);
        expect(() => compacto.setKilometraje(Infinity)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });

    it("Debe asignar el kilometraje correctamente si el valor es válido", () => {
        compacto.setKilometraje(1200);
        expect(compacto.getKilometraje()).toBe(1200);
    });

});