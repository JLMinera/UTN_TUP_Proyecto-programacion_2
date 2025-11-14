import TemporadaBaja from "../src/clases/Temporadas/TemporadaBaja";
import TemporadaError from "../src/clasesDeError/TemporadaError";

describe("TemporadaBaja", () => {
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date("2025-03-01");
        fechaFin = new Date("2025-03-10");
    });

    it("Crea una temporada baja correctamente", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
        expect(temporada.getFechaFin().getTime()).toBe(fechaFin.getTime());
        expect(temporada.getRecargo()).toBe(0.9);
    });

    it("Ajusta correctamente las horas de inicio y fin", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        expect(temporada.getFechaInicio().getHours()).toBe(0);
        expect(temporada.getFechaInicio().getMinutes()).toBe(0);

        expect(temporada.getFechaFin().getHours()).toBe(23);
        expect(temporada.getFechaFin().getMinutes()).toBe(59);
    });

    it("Lanza error si la fecha de inicio es inválida", () => {
        expect(() =>
            new TemporadaBaja(new Date("invalid"), fechaFin)
        ).toThrow(TemporadaError);
    });

    it("Lanza error si la fecha de fin es inválida", () => {
        expect(() =>
            new TemporadaBaja(fechaInicio, new Date("invalid"))
        ).toThrow(TemporadaError);
    });

    it("Lanza error si fechaFin es anterior o igual a fechaInicio", () => {
        const inicio = new Date("2025-03-05");
        const fin = new Date("2025-03-05");

        expect(() => new TemporadaBaja(inicio, fin)).toThrow(TemporadaError);
    });

    it("Detecta correctamente fechas dentro de la temporada", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-03-05");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(true);
    });

    it("Detecta correctamente fechas fuera de la temporada", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        const fechaReserva = new Date("2025-04-01");
        expect(temporada.reservaEnTemporada(fechaReserva)).toBe(false);
    });

    it("Lanza error si la fecha de reserva es inválida", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        expect(() => temporada.reservaEnTemporada(new Date("invalid")))
            .toThrow(TemporadaError);
    });

    it("Incluye inicio y fin como fechas válidas dentro de la temporada", () => {
        const temporada = new TemporadaBaja(fechaInicio, fechaFin);

        expect(temporada.reservaEnTemporada(fechaInicio)).toBe(true);
        expect(temporada.reservaEnTemporada(fechaFin)).toBe(true);
    });
});