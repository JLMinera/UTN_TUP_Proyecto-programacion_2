import TemporadaMedia from '../src/clases/TemporadaMedia'

describe("Test clase TemporadaMedia", () => {
    let temporadaMedia: TemporadaMedia;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach( () => {
        fechaInicio = new Date("22-10-2025");
        fechaFin = new Date("25-11-2025");
        temporadaMedia = new TemporadaMedia(fechaInicio, fechaFin);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo TemporadaMedia", () => {
        expect(temporadaMedia).toBeInstanceOf(TemporadaMedia);
    });

    it("Debe devolver la fecha inicio temporada media", () => {
        const fechaInicioTest = new Date("22-10-2025");
        fechaInicioTest.setHours(0, 0, 0, 0);

        expect(temporadaMedia.getFechaInicio().getTime()).toEqual(fechaInicioTest.getTime());
    });

    it("Debe devolver la fecha fin temporada media", () => {
        const fechaFinTest = new Date("25-11-2025");
        fechaFinTest.setHours(23, 59, 59, 999);

        expect(temporadaMedia.getFechaFin().getTime()).toEqual(fechaFinTest.getTime());
    });

    it("Debe devolver el valor de recargo temporada media", () => {
        expect(temporadaMedia.getRecargo()).toEqual(1);
    });

    it("Debe establecer la fecha inicio temporada media", () => {
        const fecha = new Date("10-11-2025");
        temporadaMedia.setFechaInicio(fecha);

        expect(temporadaMedia["fechaInicio"].getTime()).toEqual(fecha.getTime());
    });

    it("Debe establecer la fecha fin temporada media", () => {
        const fecha = new Date("03-12-2025");
        temporadaMedia.setFechaFin(fecha);

        expect(temporadaMedia["fechaFin"].getTime()).toEqual(fecha.getTime());
    });
    
    it("Debe establecer el valor del recargo temporada media", () => {
        temporadaMedia.setRecargo(1.5);
        expect(temporadaMedia["recargo"]).toEqual(1.5);
    });

    it("Debe devolver que fecha está dentro del rango de fechas temporada media", () => {
        let fechaReserva = new Date("20-11-2025");
        
        expect(temporadaMedia.reservaEnTemporada(fechaReserva)).toEqual(true);
    });

    it("Debe devolver que fecha no está dentro del rango de fechas temporada media", () => {
        let fechaReserva = new Date("01-11-2028");
        
        expect(temporadaMedia.reservaEnTemporada(fechaReserva)).toEqual(false);
    });
})