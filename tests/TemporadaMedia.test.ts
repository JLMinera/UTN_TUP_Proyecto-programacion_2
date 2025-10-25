import TemporadaMedia from '../src/clases/TemporadaMedia'

describe("Test clase TemporadaMedia", () => {
    let temporadaMedia: TemporadaMedia;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach( () => {
        fechaInicio = new Date(2025,10,22);
        fechaFin = new Date(2025,11,25);
        temporadaMedia = new TemporadaMedia(fechaInicio, fechaFin);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo TemporadaMedia", () => {
        expect(temporadaMedia).toBeInstanceOf(TemporadaMedia);
    });

    it("Debe devolver la fecha inicio temporada media", () => {
        const fechaInicioTest = new Date(2025,10,22);
        fechaInicioTest.setHours(0, 0, 0, 0);

        expect(temporadaMedia.getFechaInicio().getTime()).toEqual(fechaInicioTest.getTime());
    });

    it("Debe devolver la fecha fin temporada media", () => {
        const fechaFinTest = new Date(2025,11,25);
        fechaFinTest.setHours(23, 59, 59, 999);

        expect(temporadaMedia.getFechaFin().getTime()).toEqual(fechaFinTest.getTime());
    });

    it("Debe devolver el valor de recargo temporada media", () => {
        expect(temporadaMedia.getRecargo()).toEqual(1);
    });

    it("Debe establecer la fecha inicio temporada media", () => {
        const fecha = new Date(2025,11,10);
        temporadaMedia.setFechaInicio(fecha);

        expect(temporadaMedia["fechaInicio"].getTime()).toEqual(fecha.getTime());
    });

    it("Debe establecer la fecha fin temporada media", () => {
        const fecha = new Date(2025,12,3);
        temporadaMedia.setFechaFin(fecha);

        expect(temporadaMedia["fechaFin"].getTime()).toEqual(fecha.getTime());
    });
    
    it("Debe establecer el valor del recargo temporada media", () => {
        temporadaMedia.setRecargo(1.5);
        expect(temporadaMedia["recargo"]).toEqual(1.5);
    });

    it("Debe devolver que fecha está dentro del rango de fechas temporada media", () => {
        let fechaReserva = new Date(2025,11,20);
        
        expect(temporadaMedia.reservaEnTemporada(fechaReserva)).toEqual(true);
    });

    it("Debe devolver que fecha no está dentro del rango de fechas temporada media", () => {
        let fechaReserva = new Date(2028,11,1);
        
        expect(temporadaMedia.reservaEnTemporada(fechaReserva)).toEqual(false);
    });
})