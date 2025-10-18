import Disponible from "../src/clases/Disponible";
import NecesitaLimpieza from "../src/clases/NecesitaLimpieza";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}


describe("tests de la clase NecesitaLimpieza", () => {
    let vehiculo1: VehiculoTest;
    let disponible: Disponible;
    let fechaInicio: Date;
    let fechaFin: Date;
    let limpieza: NecesitaLimpieza;

    beforeEach(() => {
    fechaInicio = new Date(2025, 10, 16);
    fechaFin = new Date(2025, 10, 17);
    vehiculo1 = new VehiculoTest("ABC123", 500, 24000);
    disponible = new Disponible(fechaInicio, fechaFin);
    limpieza = new NecesitaLimpieza(200, fechaInicio, fechaFin);
})

test("El constructor de la clase debe instanciar un objeto del tipo NecesitaLimpieza", () => {
    const limpieza2 = new NecesitaLimpieza(222, fechaInicio, fechaFin);
    expect(limpieza2).toBeInstanceOf(NecesitaLimpieza);
});

test ("Devolver fecha inicio", () => {
    expect(limpieza.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Devolver fecha fin", () => {
    expect(limpieza.getFechaFin().getTime()).toBe(fechaFin.getTime());
})

test ("Devolver distancia recorrida", () => {
    expect(limpieza.getDistanciaRecorrida()).toBe(200);
})

test ("Debe setear y devolver fecha inicio", () => {
    fechaInicio = new Date(2025, 10, 16);
    limpieza.setFechaInicio(fechaInicio)
    expect(limpieza.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Debe setear y devolver fecha fin", () => {
    fechaFin = new Date(2025, 10, 17);
    limpieza.setFechaFin(fechaFin)
    expect(limpieza.getFechaFin().getTime()).toBe(fechaFin.getTime());
})

test ("Debe setear y devolver distancia recorrida", () => {
    limpieza.setDistanciaRecorrida(300000)
    expect(limpieza.getDistanciaRecorrida()).toBe(300000);
})

})