import Cliente from "../src/clases/Cliente"
import PersonaError from "../src/clasesDeError/personaError";

describe("Test Cliente", () => {

    let cliente: Cliente;

    beforeEach(() => {
        cliente = new Cliente("Pepito", "Lopez", 4352636);
    })

    it("Debe lanzar un error si no se pasa nombre", () => {
        expect(() => cliente.setNombre("")).toThrow(PersonaError);
        expect(() => cliente.setNombre("")).toThrow("El nombre no puede estar vacio")
    });

    it("Debe asignar el nombre correctamente si se pasa un valor válido", () => {
        cliente.setNombre("Pepito");
        expect(cliente.getNombre()).toEqual("Pepito");
    });

    it("Debe lanzar un error si no se pasa un apellido", () => {
        expect(() => cliente.setApellido("")).toThrow(PersonaError);
        expect(() => cliente.setApellido("")).toThrow("El apellido no puede estar vacio")
    });

    it("Debe asignar el apellido correctamente si se pasa un valor válido", () => {
        cliente.setApellido("Lopez");
        expect(cliente.getApellido()).toEqual("Lopez");
    });

    it("Debe lanzar un error si DNI esta vacio y si no es un numero entero positivo", () => {
        expect(() => cliente.setDni(0)).toThrow(PersonaError);
        expect(() => cliente.setDni(0)).toThrow("El DNI no puede estar vacio y debe ser un numero positivo")

        expect(() => cliente.setDni(-123)).toThrow(PersonaError);
        expect(() => cliente.setDni(-123)).toThrow("El DNI no puede estar vacio y debe ser un numero positivo")
    });

    it("Debe asignar el DNI correctamente si se pasa un valor válido", () => {
        cliente.setDni(4352636);
        expect(cliente.getDni()).toEqual(4352636);
    });






});