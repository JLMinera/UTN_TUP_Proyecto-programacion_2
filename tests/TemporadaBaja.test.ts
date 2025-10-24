import TemporadaBaja from '../src/clases/TemporadaBaja'

describe("Test clase TemporadaBaja", () => {
    let temporadaBaja: TemporadaBaja;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach( () => {
        fechaInicio = new Date("22-10-2025");
        fechaFin = new Date("25-11-2025");
        temporadaBaja = new TemporadaBaja(fechaInicio, fechaFin);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo TemporadaBaja", () => {
        expect(temporadaBaja).toBeInstanceOf(TemporadaBaja);
    });

    it("Debe devolver la fecha inicio temporada Baja", () => {
        const fechaInicioTest = new Date("22-10-2025");
        fechaInicioTest.setHours(0, 0, 0, 0);

        expect(temporadaBaja.getFechaInicio().getTime()).toEqual(fechaInicioTest.getTime());
    });

    it("Debe devolver la fecha fin temporada baja", () => {
        const fechaFinTest = new Date("25-11-2025");
        fechaFinTest.setHours(23, 59, 59, 999);

        expect(temporadaBaja.getFechaFin().getTime()).toEqual(fechaFinTest.getTime());
    });

    it("Debe devolver el valor de recargo temporada Baja", () => {
        expect(temporadaBaja.getRecargo()).toEqual(0.9);
    });

    it("Debe establecer la fecha inicio temporada baja", () => {
        const fecha = new Date("10-11-2025");
        temporadaBaja.setFechaInicio(fecha);

        expect(temporadaBaja["fechaInicio"].getTime()).toEqual(fecha.getTime());
    });

    it("Debe establecer la fecha fin temporada baja", () => {
        const fecha = new Date("03-12-2025");
        temporadaBaja.setFechaFin(fecha);

        expect(temporadaBaja["fechaFin"].getTime()).toEqual(fecha.getTime());
    });
    
    it("Debe establecer el valor del recargo temporada baja", () => {
        temporadaBaja.setRecargo(0.3);
        expect(temporadaBaja["recargo"]).toEqual(0.3);
    });

    it("Debe devolver que fecha está dentro del rango de fechas temporada baja", () => {
        let fechaReserva = new Date("20-11-2025");
        
        expect(temporadaBaja.reservaEnTemporada(fechaReserva)).toEqual(true);
    });

    it("Debe devolver que fecha no está dentro del rango de fechas temporada baja", () => {
        let fechaReserva = new Date("01-11-2028");
        
        expect(temporadaBaja.reservaEnTemporada(fechaReserva)).toEqual(false);
    });
})