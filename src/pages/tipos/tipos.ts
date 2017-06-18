import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fire } from '../../providers/fire';
import { Content } from 'ionic-angular';

/**
 * Generated class for the tipos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tipos',
  templateUrl: 'tipos.html',
})
export class Tipos {
  @ViewChild(Content) content: Content;
  public tipoProducto: any = [];
  public tipos: any = [];
  public todosTipos: any = [];
  public tipo: any = {};
  public query: any = "";
  public editar: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: Fire) {
    this.fire.all("TipoProducto").subscribe(tipos => {
      this.tipos = tipos;
      this.todosTipos = tipos;
    })
  }
  public inicializarTipos() {
    this.tipos = this.todosTipos;
  }
  public buscar() {
    this.inicializarTipos();
    if (this.query && this.query.trim() != '') {
      this.tipos = this.tipos.filter((item) => {
        console.log(item);
        return (("" + item.nombre).toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      })
    }
  }
  public editarTipo(id: any) {
    let producto = this.tipos.filter((item) => {
      return item.$key == id;
    })[0]
    console.log(producto);
    this.tipo = Object.assign({ key: producto.$key }, producto);
    this.editar = true;
    this.scrollToTop()
  }
  public cancelarEditar() {
    this.tipo = {}
    this.editar = false;
  }
  public eliminar(id) {
    this.fire.delete("TipoProducto", id);
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  guardarEditar() {
    let key = this.tipo.key;
    this.tipo.key = null
    this.fire.update("TipoProducto", key, this.tipo);
    this.tipo = {
      tipo: this.tipo.tipo
    }
  }
  public guardar() {
    this.fire.add("TipoProducto", this.tipo);
    this.tipo = {};
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad tipos');
  }

}
