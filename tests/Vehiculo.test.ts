import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}

describe("test de la clase Vehiculo", () => {
    let vehiculo: VehiculoTest;

beforeEach(() => {
   vehiculo = new VehiculoTest("ABC123", 500);
});

test("El constructor de la clase debe instanciar un objeto del tipo Vehiculo", () => {
    expect(vehiculo).toBeInstanceOf(VehiculoTest);
});

test("Debe devolver patente", () => {
    expect(vehiculo.getPatente()).toBe("ABC123");

});

test("Debe devolver kilometraje", () => {
    expect(vehiculo.getKilometraje()).toBe(500);
});


test("Debe setear patente", () => {
    vehiculo.setPatente("DEF456")
    expect(vehiculo['patente']).toEqual("DEF456");
});

test("Debe setear kilometraje", () => {
    vehiculo.setKilometraje(1000)
    expect(vehiculo['kilometraje']).toBe(1000);
});

});