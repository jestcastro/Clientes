import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fire } from '../../providers/fire';
import { Content } from 'ionic-angular';

/**
 * Generated class for the Productos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class Productos {
  @ViewChild(Content) content: Content;
  public tipoProducto: any = [];
  public productos: any = [];
  public todosProductos: any = [];
  public producto: any = {};
  public query: any = "";
  public editar: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: Fire) {
    this.fire.all("TipoProducto").subscribe(tipos => {
      this.tipoProducto = tipos;
    })
    this.fire.all("Productos").subscribe(productos => {
      this.productos = productos;
      this.todosProductos = productos;
    })
  }
  public inicializarProductos() {
    this.productos = this.todosProductos;
  }
  public buscar() {
    this.inicializarProductos();
    if (this.query && this.query.trim() != '') {
      this.productos = this.productos.filter((item) => {
        return (("" + item.nombre).toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      })
    }
  }
  public editarProducto(id: any) {
    let producto = this.productos.filter((item) => {
      return item.$key == id;
    })[0]
    this.producto = Object.assign({ key: producto.$key }, producto);
    this.editar = true;
    this.scrollToTop()
  }
  public cancelarEditar() {
    this.producto = {}
    this.editar = false;
  }
  public eliminar(id) {
    this.fire.delete("Productos", id);
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  guardarEditar() {
    let tipo = this.tipoProducto.filter((item) => {
      return (("" + item.$key).toLowerCase().indexOf(this.producto.tipo.toLowerCase()) > -1);
    })[0];
    this.producto.tipoNombre = tipo.nombre;
    let key = this.producto.key;
    this.producto.key = null
    this.fire.update("Productos", key, this.producto);
    this.producto = {};
    this.producto.tipo = tipo.$key;
  }
  public guardar() {
    console.log(this.producto);
    let tipo = this.tipoProducto.filter((item) => {
      return (("" + item.$key).toLowerCase().indexOf(this.producto.tipo.toLowerCase()) > -1);
    })[0];
    this.producto.tipoNombre = tipo.nombre;
    this.fire.add("Productos", this.producto);
    this.producto.nombre = null;
    this.producto.precio = null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Productos');
  }

}
