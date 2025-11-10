import Mantenimiento from "../src/clases/Mantenimiento"

describe("tests de la clase Mantenimiento", () => {
    let mantenimiento: Mantenimiento;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date(2025, 10, 16);
        fechaFin = new Date(2025, 10, 17);
        mantenimiento = new Mantenimiento(200000, fechaInicio, fechaFin);
    });

    test("El constructor de la clase debe instanciar un objeto del tipo Mantenimiento", () => {
        const mantenimiento2 = new Mantenimiento(2233, fechaInicio, fechaFin);
        expect(mantenimiento2).toBeInstanceOf(Mantenimiento);
    });

    test("Debe devolver fecha inicio", () => {
        expect(mantenimiento.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
    });

    test("Debe devolver fecha fin", () => {
        expect(mantenimiento.getFechaFin().getTime()).toBe(fechaFin.getTime());
    });

    test("Debe devolver costo", () => {
        expect(mantenimiento.getCosto()).toBe(200000);
    });

    test("Debe setear y devolver fecha inicio", () => {
        const nuevaFechaInicio = new Date(2025, 4, 5);
        mantenimiento.setFechaInicio(nuevaFechaInicio);
        expect(mantenimiento.getFechaInicio()).toBe(nuevaFechaInicio);
    });

    test("Debe setear y devolver fecha fin", () => {
        const nuevaFechaFin = new Date(2025, 4, 10);
        mantenimiento.setFechaFin(nuevaFechaFin);
        expect(mantenimiento.getFechaFin()).toBe(nuevaFechaFin);
    });

    test("Debe setear y devolver costo", () => {
        mantenimiento.setCosto(300000);
        expect(mantenimiento.getCosto()).toBe(300000);
    });
});
