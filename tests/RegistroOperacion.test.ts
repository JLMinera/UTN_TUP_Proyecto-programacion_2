import RegistroOperacion from "../src/clases/RegistroOperacion"

describe("Inventario", () => {

    let operacion: RegistroOperacion;
    let fecha: Date;

    beforeEach(() => {
        fecha = new Date();
        const costo = 1200;
        operacion = new RegistroOperacion(fecha, costo);
    });

    it("Debe devolver la fecha correctamente", () => {
         expect(operacion.getFecha().getTime()).toBe(fecha.getTime());
    });

    it("Debe asignar el la fecha correctamente", () => {
        const fechaNueva = new Date();
        operacion.setFecha(fechaNueva);
        expect(operacion.getFecha().getTime()).toBe(fechaNueva.getTime());
    });

    it("Debe devolver el costo correctamente", () => {
        expect(operacion.getCosto()).toBe(1200);
    });

    it("Debe asignar el costo correctamente", () => {
        const costoNuevo = 2500;
        operacion.setCosto(costoNuevo);
        expect(operacion.getCosto()).toBe(costoNuevo);
    });


});