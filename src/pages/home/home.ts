import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../providers/fire';
import { NuevaOrden } from "../nueva-orden/nueva-orden"
import { NuevoCliente } from "../nuevo-cliente/nuevo-cliente"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public clientes: any = []
  public todosClientes: any
  public query: any
  public cargando: any = true;
  constructor(public navCtrl: NavController, public fire: Fire, private ngZone: NgZone) {
    this.fire.all("Clientes").subscribe(clientes => {
      this.ngZone.run(() => {
        this.clientes = clientes;
        this.todosClientes = clientes;
        this.cargando = false;
        console.log(this.clientes)
      })
    })
  }
  public inicializarClientes() {
    this.clientes = this.todosClientes;
  }
  public irNuevoClienteNumero() {
    this.navCtrl.push(NuevoCliente, {
      numero: this.query
    });
  }
  public irNuevoCliente() {
    this.navCtrl.push(NuevoCliente);
  }
  public irCliente(idCliente: any) {
    this.navCtrl.push(NuevoCliente, {
      id: idCliente
    });
  }
  public buscar(ev: any) {
    this.inicializarClientes();
    this.query = ev.target.value;
    if (this.query && this.query.trim() != '') {
      this.clientes = this.clientes.filter((item) => {
        console.log(item);
        return (("" + item.telefono).toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      })
    }
  }

}
