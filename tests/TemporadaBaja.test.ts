import TemporadaBaja from '../src/clases/TemporadaBaja'

describe("Test clase TemporadaBaja", () => {
    let temporadaBaja: TemporadaBaja;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach( () => {
        fechaInicio = new Date("22-08-2025");
        fechaFin = new Date("25-09-2025");
        temporadaBaja = new TemporadaBaja(fechaInicio, fechaFin);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo TemporadaBaja", () => {
        expect(temporadaBaja).toBeInstanceOf(TemporadaBaja);
    });

    it("Debe devolver la fecha inicio temporada Baja", () => {
        const fechaInicioTest = new Date("22-03-2025");
        expect(temporadaBaja.getFechaInicio()).toEqual(fechaInicioTest);
    });

    it("Debe devolver la fecha fin temporada baja", () => {
        const fechaFinTest = new Date("25-05-2025");
        expect(temporadaBaja.getFechaFin()).toEqual(fechaFinTest);
    });

    it("Debe devolver el valor de recargo temporada baja", () => {
        expect(temporadaBaja.getRecargo()).toEqual(0.9);
    });

    it("Debe establecer la fecha inicio temporada baja", () => {
        const fecha = new Date("10-11-2025");
        temporadaBaja.setFechaInicio(fecha);

        expect(temporadaBaja["fechaInicio"]).toEqual(fecha);
    });

    it("Debe establecer la fecha fin temporada baja", () => {
        const fecha = new Date("03-12-2025");
        temporadaBaja.setFechaInicio(fecha);

        expect(temporadaBaja["fechaFin"]).toEqual(fecha);
    });
    
    it("Debe establecer el valor del recargo temporada alta", () => {
        temporadaAlta.setRecargo(0.9);
        expect(temporadaBaja["recargo"]).toEqual(0.9);
    });

    it("Debe devolver que fecha está dentro del rango de fechas temporada baja", () => {
        let fechaReserva = new Date("01-04-2025");
        
        expect(temporadaBaja.reservaEnTemporada(fechaReserva)).toEqual(true);
    });

    it("Debe devolver que fecha no está dentro del rango de fechas temporada baja", () => {
        let fechaReserva = new Date("01-11-2028");
        
        expect(temporadaBaja.reservaEnTemporada(fechaReserva)).toEqual(false);
    });
})