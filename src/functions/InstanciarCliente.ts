import Cliente from "../clases/Cliente"

export function instanciarCliente(nombre: string, apellido: string, dni: number): Cliente{

    return new Cliente(nombre, apellido, dni)
    }