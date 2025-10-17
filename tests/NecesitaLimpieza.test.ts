import Disponible from "../src/clases/Disponible";
import Estado from "../src/clases/Estado";
import NecesitaLimpieza from "../src/clases/NecesitaLimpieza";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}


describe("tests de la clase NecesitaLimpieza", () =>{
    let vehiculo1: VehiculoTest;
    let disponible: Disponible;
    let limpieza: NecesitaLimpieza;


beforeEach(() => {
    limpieza = new NecesitaLimpieza(200000, 20250101, 20251231)
    vehiculo1 = new VehiculoTest("ABC123", 500, 24000, true, limpieza);
    disponible = new Disponible(20250101, 20251231);
})

test("El constructor de la clase debe instanciar un objeto del tipo NecesitaLimpieza", () => {
    const limpieza2 = new NecesitaLimpieza(222, 20250102, 20251232);
    expect(limpieza2).toBeInstanceOf(NecesitaLimpieza);
});

test ("Devolver fecha inicio", () => {
    expect(limpieza.getFechaInicio()).toBe(20250101);
})

test ("Devolver fecha fin", () => {
    expect(limpieza.getFechaFin()).toBe(20251231);
})

test ("Devolver distancia recorrida", () => {
    expect(limpieza.getdistanciaRecorrida()).toBe(200000);
})

test ("Debe setear y devolver fecha inicio", () => {
    limpieza.setFechaInicio(20250505)
    expect(limpieza.getFechaInicio()).toBe(20250505);
})

test ("Debe setear y devolver fecha fin", () => {
    limpieza.setFechaFin(20250510)
    expect(limpieza.getFechaFin()).toBe(20250510);
})

test ("Debe setear y devolver distancia recorrida", () => {
    limpieza.setdistanciaRecorrida(300000)
    expect(limpieza.getdistanciaRecorrida()).toBe(300000);
})

})