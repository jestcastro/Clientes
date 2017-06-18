import { AutoCompleteService } from 'ionic2-auto-complete';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Fire } from '../providers/fire';

@Injectable()
export class CompleteService implements AutoCompleteService {
    labelAttribute = "name";

    constructor(private fire: Fire) {

    }
    getResults(keyword: string) {
        return this.fire.all("Clientes").map(clientes => {
            for (let cliente of clientes) {
                console.log(cliente);
                cliente.perfil = cliente.nombre + " - " + cliente.telefono;
                cliente.key = cliente.$key;
            }
            return clientes;
        }).map(clientes => {
            return clientes.filter((cliente) => {
                return (("" + cliente.telefono).toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            })
        }).map(clientes => {
            if (clientes.length == 0) {
                clientes.push({ perfil: "Sin Resultados. Agregar Nuevo Cliente" })
            }
            return clientes;
        })

    }
    itemSelected($event) {
        console.log("efnkjwfenjkwnfjnwejkfnwekjnfjkwnfjewnfjkewnfjknewfjknwefjnwefnkjwenfjkwen")
    }
}
