import TemporadaMedia from "../src/clases/Temporadas/TemporadaMedia";
import TemporadaError from "../src/clasesDeError/TemporadaError";

describe("TemporadaMedia", () => {
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date("2025-06-01");
        fechaFin = new Date("2025-06-15");
    });

    it("Crea una temporada media correctamente", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
        expect(temporada.getFechaFin().getTime()).toBe(fechaFin.getTime());
        expect(temporada.getRecargo()).toBe(1);
    });

    it("Ajusta correctamente las horas de inicio y fin", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getHours()).toBe(0);
        expect(temporada.getFechaInicio().getMinutes()).toBe(0);

        expect(temporada.getFechaFin().getHours()).toBe(23);
        expect(temporada.getFechaFin().getMinutes()).toBe(59);
    });

    it("Lanza error si la fecha de inicio es inválida", () => {
        expect(() =>
            new TemporadaMedia(new Date("invalid"), fechaFin)
        ).toThrow(TemporadaError);
    });

    it("Lanza error si la fecha de fin es inválida", () => {
        expect(() =>
            new TemporadaMedia(fechaInicio, new Date("invalid"))
        ).toThrow(TemporadaError);
    });

    it("Lanza error si fechaFin es anterior o igual a fechaInicio", () => {
        const inicio = new Date("2025-06-10");
        const fin = new Date("2025-06-10");

        expect(() => new TemporadaMedia(inicio, fin)).toThrow(TemporadaError);
    });

    it("Detecta correctamente fechas dentro de la temporada", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-06-05");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(true);
    });

    it("Detecta correctamente fechas fuera de la temporada", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-07-01");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(false);
    });

    it("Lanza error si la fecha de reserva es inválida", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        expect(() => temporada.reservaEnTemporada(new Date("invalid")))
            .toThrow(TemporadaError);
    });

    it("Incluye inicio y fin como fechas válidas dentro de la temporada", () => {
        const temporada = new TemporadaMedia(fechaInicio, fechaFin);

        expect(temporada.reservaEnTemporada(fechaInicio)).toBe(true);
        expect(temporada.reservaEnTemporada(fechaFin)).toBe(true);
    });
});