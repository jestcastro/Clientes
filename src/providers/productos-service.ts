import { AutoCompleteService } from 'ionic2-auto-complete';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Fire } from '../providers/fire';

@Injectable()
export class ProductoService implements AutoCompleteService {
    labelAttribute = "name";

    constructor(private fire: Fire) {

    }
    getResults(keyword: string) {
        return this.fire.all("Productos").map(productos => {
            for (let producto of productos) {
                producto.perfil = producto.tipoNombre + " - " + producto.nombre
            }
            return productos;
        }).map(productos => {
            return productos.filter((producto) => {
                return (("" + producto.perfil).toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            })
        }).map(productos => {
            if (productos.length == 0) {
                productos.push({ perfil: "Sin Resultados." })
            }
            return productos;
        })

    }
    itemSelected($event){
        console.log("efnkjwfenjkwnfjnwejkfnwekjnfjkwnfjewnfjkewnfjknewfjknwefjnwefnkjwenfjkwen")
    }
}
