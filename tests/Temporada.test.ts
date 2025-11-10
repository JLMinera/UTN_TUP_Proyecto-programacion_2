import Temporada from "../src/clases/Temporada";
import TemporadaError from "../src/clasesDeError/TemporadaError";

class TemporadaTest extends Temporada {}

describe("Test de la clase Temporada", () => {
    let fechaInicio: Date;
    let fechaFin: Date;
    let temporada: TemporadaTest;

    beforeEach(() => {
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-10");
        temporada = new TemporadaTest(fechaInicio, fechaFin, 0.15);
    });

    test("Debe instanciar un objeto del tipo Temporada", () => {
        expect(temporada).toBeInstanceOf(TemporadaTest);
    });

    test("Debe devolver las fechas y el recargo correctamente", () => {
        expect(temporada.getFechaInicio()).toEqual(fechaInicio);
        expect(temporada.getFechaFin()).toEqual(fechaFin);
        expect(temporada.getRecargo()).toBe(0.15);
    });

    test("Debe lanzar error si la fecha de inicio no es válida", () => {
        const fechaInvalida = new Date("2025-13-40");
        expect(() => temporada.setFechaInicio(fechaInvalida)).toThrow(TemporadaError);
        expect(() => temporada.setFechaInicio(fechaInvalida)).toThrow("La fecha de inicio no es válida");
    });

    test("Debe lanzar error si la fecha de fin no es válida", () => {
        const fechaInvalida = new Date("2025-02-35");
        expect(() => temporada.setFechaFin(fechaInvalida)).toThrow(TemporadaError);
        expect(() => temporada.setFechaFin(fechaInvalida)).toThrow("La fecha de fin no es válida");
    });

    test("Debe lanzar error si la fecha de fin es anterior o igual a la fecha de inicio", () => {
        const fechaAnterior = new Date("2024-12-31");
        expect(() => temporada.setFechaFin(fechaAnterior)).toThrow(TemporadaError);
        expect(() => temporada.setFechaFin(fechaAnterior)).toThrow("La fecha de fin debe ser posterior a la fecha de inicio");
    });

    test("Debe lanzar error si el recargo es negativo o no numérico", () => {
        expect(() => temporada.setRecargo(-1)).toThrow(TemporadaError);
        expect(() => temporada.setRecargo(-1)).toThrow("El recargo debe ser un número mayor o igual a 0");
    });

    test("Debe asignar correctamente el recargo si es válido", () => {
        temporada.setRecargo(0.25);
        expect(temporada.getRecargo()).toBe(0.25);
    });

    test("reservaEnTemporada debe devolver true si la fecha está dentro del rango", () => {
        const fechaReserva = new Date("2025-01-05");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(true);
    });

    test("reservaEnTemporada debe devolver false si la fecha está fuera del rango", () => {
        const fechaReserva = new Date("2025-02-01");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(false);
    });

    test("Debe lanzar error si la fecha de reserva es inválida", () => {
        const fechaInvalida = new Date("2025-20-10");
        expect(() => temporada.reservaEnTemporada(fechaInvalida)).toThrow(TemporadaError);
        expect(() => temporada.reservaEnTemporada(fechaInvalida)).toThrow("La fecha de reserva no es válida");
    });
});
