import { instanciarCliente } from "./functions/instanciarCliente";
import { instanciarSuv } from "./functions/InstanciarVehiculo";


function main() {

    try {
        const cliente = instanciarCliente("Franco", "Colapinto", 35789243);


    } catch (error) {
        console.error("No se pudo crear el cliente", (error as Error).message);
    }

}

try {
    const ToyotaCorolla = instanciarSuv("ABC123", 0, 80, 0.25, 500, 15);


} catch (error) {
    console.error("No se pudo crear el vehiculo", (error as Error).message);
}


main();