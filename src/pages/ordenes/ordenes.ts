import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fire } from '../../providers/fire';
import { CompleteService } from '../../providers/complete-service';
import { AutoCompleteComponent } from 'ionic2-auto-complete';

import { NuevaOrden } from "../nueva-orden/nueva-orden"
import { NuevoCliente } from "../nuevo-cliente/nuevo-cliente"

/**
 * Generated class for the Ordenes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class Ordenes {
  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;
  private ordenes: any = [];
  private query: any = "todos";
  private telefono: any = {};
  private todosOrdenes: any = [];
  private filtro: any = "Tomada"
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: Fire, private ngZone: NgZone, public completeTestService: CompleteService) {
    this.fire.allQuery("Orden", {
      query: {
        orderByChild: 'horaNegativa',
      }
    }).subscribe(ordenes => {
      this.ngZone.run(() => {
        console.log(ordenes);
        this.ordenes = ordenes;
      })
    })

  }
  ionViewDidLoad() {
    this.searchbar.ionAutoInput.subscribe(e => {
      this.telefono.anterior = this.telefono.nuevo;
      this.telefono.nuevo = e;
    })
    this.searchbar.itemSelected.subscribe((e) => {
      let telefono = this.telefono.nuevo;
      this.searchbar.clearValue();
      if (e.perfil == "Sin Resultados. Agregar Nuevo Cliente") {
        console.log(telefono);
        this.irNuevoCliente(telefono);
      } else {
        console.log(e.$key);
        this.irNuevaOrden(e.$key);
      }
    })
  }


  public irNuevoCliente(telefono) {
    this.navCtrl.push(NuevaOrden, {
      tipo: 0,
      data: telefono
    });
  }
  public irNuevaOrden(idCliente: any) {
    this.navCtrl.push(NuevaOrden, {
      tipo: 1,
      data: idCliente
    });
  }
  public irNuevaOrdenBuscar(idCliente: any) {
    this.navCtrl.push(NuevaOrden, {
      tipo: 2
    });
  }
  public irEditar(idOrden: any) {
    this.navCtrl.push(NuevaOrden, {
      tipo: 3,
      data: idOrden
    });
  }

  public inicializarProductos() {
    this.ordenes = this.todosOrdenes;
  }
  public buscar() {
    this.inicializarProductos();
    if (this.query != "todos") {
      if (this.query && this.query.trim() != '') {
        this.ordenes = this.ordenes.filter((item) => {
          return (("" + item.nombre).toLowerCase().indexOf(this.query.toLowerCase()) > -1);
        })
      }
    }
  }
  cambiarEstado(estado, key) {
    let orden: any = { estado: '' };
    switch (estado) {
      case 'Tomada': {
        orden.estado = 'Enviada';
        orden.horaEnvio = new Date().getTime();
        break;
      }
      case 'Enviada': {
        orden.estado = 'Pagada';
        orden.horaPagada = new Date().getTime();
        break;
      }
      case 'Pagada': {
        orden.estado = 'Pagada';
        break;
      }
    }
    if (estado != orden.estado) {
      this.fire.update('Orden', key, orden);
    }
    this.filtro = orden.estado;
  }

}
