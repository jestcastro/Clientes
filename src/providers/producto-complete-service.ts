import { AutoCompleteService } from 'ionic2-auto-complete';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Fire } from '../providers/fire';

@Injectable()
export class ProductoCompleteService implements AutoCompleteService {
    labelAttribute = "name";

    constructor(private fire: Fire) {

    }
    getResults(keyword: string) {
        return this.fire.all("Producto").map(productos => {
            for (let producto of productos) {
                console.log(producto);
                producto.perfil = producto.nombre;
                producto.key = producto.$key;
            }
            return productos;
        }).map(productos => {
            return productos.filter((producto) => {
                return (("" + producto.nombre).toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            })
        })

    }
    itemSelected($event) {
        console.log("efnkjwfenjkwnfjnwejkfnwekjnfjkwnfjewnfjkewnfjknewfjknwefjnwefnkjwenfjkwen")
    }
}
