import VehiculoSuv from "../src/clases/Vehiculos/VehiculoSuv";
import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Test Suv (hereda de Vehiculo)", () => {

    let suv: VehiculoSuv;

    beforeEach(() => {
        suv = new VehiculoSuv("ABC123", 1000);
    });

    it("Debe instanciar correctamente una Suv con valores válidos", () => {
        expect(suv.getPatente()).toBe("ABC123");
        expect(suv.getKilometraje()).toBe(1000);
    });

    it("Debe lanzar un error si la patente está vacía", () => {
        expect(() => suv.setPatente("")).toThrow(VehiculoError);
        expect(() => suv.setPatente("")).toThrow("La patente no puede estar vacía");

        expect(() => suv.setPatente("   ")).toThrow(VehiculoError);
        expect(() => suv.setPatente("   ")).toThrow("La patente no puede estar vacía");
    });

    it("Debe asignar la patente correctamente si el valor es válido", () => {
        suv.setPatente("XYZ987");
        expect(suv.getPatente()).toBe("XYZ987");
    });
    
    it("Debe lanzar error si la patente es null", () => {
    expect(() => suv.setPatente(null as any)).toThrow(VehiculoError);
    });

   it("Debe lanzar un error si el kilometraje es negativo", () => {
    expect(() => suv.setKilometraje(-1))
        .toThrow("El kilometraje debe ser un número mayor o igual a 0");
});

it("Debe lanzar un error si el kilometraje no es un número finito", () => {
    expect(() => suv.setKilometraje(NaN))
        .toThrow("El kilometraje debe ser un número mayor o igual a 0");
});

it("Debe asignar el kilometraje correctamente si el valor es válido", () => {
    suv.setKilometraje(2500);
    expect(suv.getKilometraje()).toBe(2500);
});
});