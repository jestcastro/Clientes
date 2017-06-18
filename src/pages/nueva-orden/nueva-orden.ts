import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, AlertController, ToastController, Content } from 'ionic-angular';
import { Fire } from '../../providers/fire';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { CompleteService } from '../../providers/complete-service';
import { ProductoService } from '../../providers/productos-service';

/**
 * Generated class for the NuevaOrden page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nueva-orden',
  templateUrl: 'nueva-orden.html',
})
export class NuevaOrden {
  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;
  @ViewChild('productos')
  searchbarProductos: AutoCompleteComponent;
  @ViewChild('cantidad') cantidad;
  @ViewChild(Content) content: Content;
  private cliente: any = {};
  private telefono: any = [];
  private productos: any;
  private linea: any = {};
  private ui: any = {};
  private orden: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: Fire,
    public completeTestService: CompleteService, public productService: ProductoService, private toast: ToastController, private alert: AlertController) {
    this.orden.express = true; this.orden.lineas = [];
    this.orden.dataphone = false;
    this.ui.tipo = this.navParams.get("tipo");
    switch (this.ui.tipo) {
      case 0: {
        this.nuevaOrdenTelefono(this.navParams.get("data"));
        break;
      }
      case 1: {
        this.nuevaOrdenCliente(this.navParams.get("data"));
        break;
      }
      case 3: {
        this.editarOrden(this.navParams.get("data"));
        break;
      }
      default:
        break;
    }
    this.fire.all("Productos").subscribe(productos => {
      this.productos = productos;
    })
  }
  public nuevaOrdenCliente(idCliente) {
    this.fire.getById("Clientes", idCliente).subscribe(cliente => {
      this.cliente = cliente;
    })
  }
  public nuevaOrdenTelefono(telefono) {
    this.cliente.telefono = telefono;
  }
  public editarOrden(idOrden) {
    console.log(idOrden);
    this.fire.getById("Orden", idOrden).subscribe(orden => {
      console.log(orden)
      this.orden = orden;
    })

  }

  public ionViewDidLoad() {
    this.searchbarProductos.itemSelected.subscribe((e) => {
      console.log(e);
      this.searchbarProductos.clearValue();
      this.searchbarProductos.setValue(e.nombre);
      this.linea.producto = e.$key;
      this.precio();
    })

    if (this.ui.tipo == 2) {
      this.searchbar.ionAutoInput.subscribe(e => {
        this.telefono.nuevo = e;
      })
      this.searchbar.itemSelected.subscribe((e) => {
        let telefono = this.telefono.nuevo;
        this.searchbar.clearValue();
        if (e.perfil == "Sin Resultados. Agregar Nuevo Cliente") {
          this.cliente = {};
          this.cliente.telefono = telefono;
        } else {
          this.cliente = e;
        }
        this.ui.verInfoCliente = true;
        this.calcularPrecio();
        this.content.scrollToBottom();
      })
    }

  }
  public buscarProducto() {
    this.content.scrollToTop();
  }
  public buscar() {
    this.content.scrollToBottom();
  }
  public verCliente() {
    this.ui.verInfoCliente = this.ui.verInfoCliente == true ? false : true;
  }
  public precio() {
    if (this.linea.producto != null) {
      let producto = this.productos.filter((item) => {
        return item.$key == this.linea.producto
      })[0];
      if (!producto.especial) {
        this.linea.descripcion = producto.nombre;
        this.linea.subtotal = producto.precio * this.linea.cantidad;
        this.linea.total = this.linea.subtotal;
      } else {
        this.linea.total = this.linea.cantidad * this.linea.subtotal;
      }
    }
  }
  public peso() {
    if (this.linea.producto != null) {
      let producto = this.productos.filter((item) => {
        return item.$key == this.linea.producto
      })[0];
      if (!producto.especial) {
        this.linea.total = this.linea.subtotal;
        this.linea.descripcion = producto.nombre;
        this.linea.cantidad = this.linea.total / producto.precio;
      } else {
        this.linea.total = this.linea.cantidad * this.linea.subtotal;
      }
    }
  }
  public agregar() {
    if (this.linea.producto != null) {
      this.precio();
      let producto = this.productos.filter((item) => {
        return item.$key == this.linea.producto
      })[0];
      this.linea.descripcion = producto.nombre;
      console.log(this.linea);
      this.orden.lineas.push(Object.assign({}, this.linea));
      this.linea.total = null;
      this.linea.cantidad = null;
      this.linea.subtotal = null;
      this.calcularPrecio();
    }
  }
  public calcularPrecio() {
    this.orden.total = 0
    this.orden.lineas.forEach(linea => {
      this.orden.total += linea.total;
    })
    this.orden.total += (this.orden.express ? parseInt(this.cliente.express == null ? 0 : this.cliente.express) : 0)
  }
  public focusProducto() {
    this.precio();
  }

  public editarLinea(linea, index) {
    this.linea = linea;
    this.searchbarProductos.setValue(this.linea.descripcion);
    this.orden.lineas.splice(index, 1);
    this.calcularPrecio();
  }
  public eliminarLinea(linea, index) {
    this.orden.lineas.splice(index, 1);
    this.calcularPrecio();
  }
  guardarCliente() {
    if (this.ui.tipo == 1) {
      this.fire.update("Clientes", this.cliente.$key, this.cliente);
    }
    if (this.ui.tipo == 2 && this.cliente.$key) {
      this.fire.update("Clientes", this.cliente.$key, this.cliente);
    }
    if (this.ui.tipo == 0) {
      this.cliente.$key = this.fire.add("Clientes", this.cliente);
    }
  }

  public guardar() {
    this.guardarCliente();
    if (this.orden.lineas.length > 0) {
      this.orden = Object.assign(this.orden, {
        nombreCliente: this.cliente.nombre ? this.cliente.nombre : "",
        telefonoCliente: this.cliente.telefono ? this.cliente.telefono : "",
        direccionCliente: this.cliente.direccion ? this.cliente.direccion : "",
        idCliente: this.cliente.$key
      });
      if (this.orden.express) {
        this.orden.horaEnvio = "";
        this.orden.costoExpress = this.cliente.express;
      }
      this.orden.hora = (new Date).getTime();
      this.orden.horaNegativa = (new Date).getTime() * -1;
      this.orden.estado = "Tomada";
      this.fire.add("Orden", this.orden);
      this.ordenAgregada();
      this.navCtrl.pop();
    } else {
      console.log("aqui")
      this.error()
    }
  }
  public error() {
    let alert = this.alert.create({
      title: 'Productos',
      message: 'No agrego productos a la Orden',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
  public ordenAgregada() {
    let toast = this.toast.create({
      message: 'La orden fue agregada correctamente',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
