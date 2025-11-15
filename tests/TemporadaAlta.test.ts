import TemporadaAlta from "../src/clases/Temporadas/TemporadaAlta";
import TemporadaError from "../src/clasesDeError/TemporadaError";

describe("TemporadaAlta", () => {
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-10");
    });

    it("Crea una temporada alta correctamente", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
        expect(temporada.getFechaFin().getTime()).toBe(fechaFin.getTime());
        expect(temporada.getRecargo()).toBe(1.2);
    });

    it("Ajusta los horarios a 00:00:00.000 (inicio) y 23:59:59.999 (fin)", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getHours()).toBe(0);
        expect(temporada.getFechaInicio().getMinutes()).toBe(0);

        expect(temporada.getFechaFin().getHours()).toBe(23);
        expect(temporada.getFechaFin().getMinutes()).toBe(59);
    });

    it("Lanza error cuando fechaInicio es inválida", () => {
        expect(() =>
            new TemporadaAlta(new Date("invalid"), fechaFin)
        ).toThrow(TemporadaError);
    });

    it("Lanza error cuando fechaFin es inválida", () => {
        expect(() =>
            new TemporadaAlta(fechaInicio, new Date("invalid"))
        ).toThrow(TemporadaError);
    });

    it("Lanza error cuando fechaFin es anterior o igual a fechaInicio", () => {
        const inicio = new Date("2025-01-05");
        const fin = new Date("2025-01-05");

        expect(() => new TemporadaAlta(inicio, fin)).toThrow(TemporadaError);
    });

    it("Detecta correctamente cuando una fecha está dentro de la temporada", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-01-05");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(true);
    });

    it("Detecta correctamente cuando una fecha está fuera de temporada", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-02-01");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(false);
    });

    it("Lanza error cuando la fecha de reserva es inválida", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        expect(() => temporada.reservaEnTemporada(new Date("invalid"))).toThrow(TemporadaError);
    });

    it("Incluye correctamente a la fecha de inicio y fin como válidas", () => {
        const temporada = new TemporadaAlta(fechaInicio, fechaFin);

        expect(temporada.reservaEnTemporada(fechaInicio)).toBe(true);
        expect(temporada.reservaEnTemporada(fechaFin)).toBe(true);
    });
});
