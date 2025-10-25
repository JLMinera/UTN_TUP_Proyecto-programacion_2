import TemporadaAlta from '../src/clases/TemporadaAlta'

describe("Test clase TemporadaAlta", () => {
    let temporadaAlta: TemporadaAlta;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach( () => {
        fechaInicio = new Date(2025,10,22);
        fechaFin = new Date(2025,11,25);
        temporadaAlta = new TemporadaAlta(fechaInicio, fechaFin);
    });

    afterEach(() => {});

    it("El constructor de la clase debe instanciar un objeto del tipo TemporadaAlta", () => {
        expect(temporadaAlta).toBeInstanceOf(TemporadaAlta);
    });

    it("Debe devolver la fecha inicio temporada Alta", () => {
        const fechaInicioTest = new Date(2025,10,22);
        fechaInicioTest.setHours(0, 0, 0, 0);

        expect(temporadaAlta.getFechaInicio().getTime()).toEqual(fechaInicioTest.getTime());
    });

    it("Debe devolver la fecha fin temporada alta", () => {
        const fechaFinTest = new Date(2025,11,25);
        fechaFinTest.setHours(23, 59, 59, 999);

        expect(temporadaAlta.getFechaFin().getTime()).toEqual(fechaFinTest.getTime());
    });

    it("Debe devolver el valor de recargo temporada Alta", () => {
        expect(temporadaAlta.getRecargo()).toEqual(1.2);
    });

    it("Debe establecer la fecha inicio temporada alta", () => {
        const fecha = new Date(2025,11,10);
        temporadaAlta.setFechaInicio(fecha);

        expect(temporadaAlta["fechaInicio"].getTime()).toEqual(fecha.getTime());
    });

    it("Debe establecer la fecha fin temporada alta", () => {
        const fecha = new Date(2025,12,3);
        temporadaAlta.setFechaFin(fecha);

        expect(temporadaAlta["fechaFin"].getTime()).toEqual(fecha.getTime());
    });
    
    it("Debe establecer el valor del recargo temporada alta", () => {
        temporadaAlta.setRecargo(1.5);
        
        expect(temporadaAlta["recargo"]).toEqual(1.5);
    });

    it("Debe devolver que fecha está dentro del rango de fechas temporada alta", () => {
        let fechaReserva = new Date(2025,11,20);

        expect(temporadaAlta.reservaEnTemporada(fechaReserva)).toEqual(true);
    });

    it("Debe devolver que fecha no está dentro del rango de fechas temporada alta", () => {
        let fechaReserva = new Date(2028,11,1);
        
        expect(temporadaAlta.reservaEnTemporada(fechaReserva)).toEqual(false);
    });
})