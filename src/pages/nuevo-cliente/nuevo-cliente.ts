import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, ToastController } from 'ionic-angular';
import { Fire } from '../../providers/fire';

/**
 * Generated class for the NuevaOrden page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoCliente {
  @ViewChild('producto') select: Select;
  private cliente: any = {};
  private productos: any;
  private tipo: any;
  private todosProductos: any;
  private linea: any;
  private compras: any = [];
  private lineas: any = [];
  private total: any = 0;
  private verInfoCliente: any = false;
  private nota: any = false;
  private notas: any = "";
  private orden: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: Fire, private toast: ToastController) {
    console.log(this.navParams.get("id"))
    if (this.navParams.get("id")) {
      this.tipo = true;
      this.fire.getById("Clientes", this.navParams.get("id")).subscribe(cliente => {
        this.cliente = cliente;
      })
      this.fire.allQuery("Orden", {
        query: {
          orderByChild: 'idCliente',
          equalTo: this.navParams.get("id")
        }
      }).subscribe(compras => {
        this.compras = compras
      })
    } else {
      this.tipo = false;
      if (this.navParams.get("numero")) {
        this.cliente.telefono = this.navParams.data;
      }
    }
  }

  public guardar() {
    if (this.tipo) {
      this.fire.update("Clientes", this.cliente.$key, this.cliente);
      this.mensaje("Cliente actualizado correctamente")
    } else {
      this.cliente.$key = this.fire.add("Clientes", this.cliente);
      this.mensaje("Cliente agregado correctamente")
    }
    this.navCtrl.pop();
  }
  public mensaje(mensaje) {
    let toast = this.toast.create({
      message: mensaje,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }





  /*constructor(public navCtrl: NavController, public navParams: NavParams, public fire: Fire) {
    this.linea = {};
    this.cliente = {};
    this.cliente.express = 0;
    this.cliente.telefono = this.navParams.data;
    this.fire.all("Productos").subscribe(productos => {
      this.productos = productos;
    })
    this.fire.all("TipoProducto").subscribe(productos => {
      this.tipos = productos;
    })
  }
  public precio() {
    if (this.linea.producto != null) {
      let producto = this.productos.filter((item) => {
        return item.$key == this.linea.producto
      });
      this.linea.descripcion = producto[0].nombre;
      this.linea.total = producto[0].precio * this.linea.cantidad;
    }
  }
  public verCliente() {
    this.verInfoCliente = this.verInfoCliente == true ? false : true;
  }
  public peso() {
    if (this.linea.producto != null) {
      let producto = this.productos.filter((item) => {
        return item.$key == this.linea.producto
      })[0];
      this.linea.descripcion = producto.nombre;
      this.linea.cantidad = this.linea.total / producto.precio;
    }
  }
  public agregar() {
    if (this.linea.producto != null) {
      this.precio();
      this.lineas.push(this.linea);
      this.linea = {};
      this.calcularPrecio();
    }
  }
  calcularPrecio() {
    this.total = 0
    this.lineas.forEach(linea => {
      console.log(this.cliente.express==""?0:this.cliente.express);
      this.total += linea.total + (this.express ? parseInt(this.cliente.express==""?0:this.cliente.express) : 0);
    })
  }
  public guardar() {
    this.fire.add("Clientes", this.cliente);
    let orden: any = {
      nombreCliente: this.cliente.nombre,
      telefonoCliente: this.cliente.telefono,
      idCliente: this.cliente.$key,
      lineas: this.lineas,
      total: this.total,
      express: this.express
    }
    if (this.express) {
      orden.horaEnvio = ""
    }
    orden.hora = (new Date).getTime();
    this.fire.add("Orden", orden);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaOrden');
  }*/

}
