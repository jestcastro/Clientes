import { Injectable } from '@angular/core';
//import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class Fire {
  private uid: any;
  private provider: any;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
    //console.log('Hello Fire Provider');
  }
  /*getByName(name){
    let ref=querybaseRef.where('fullName').startsWith(name);
    console.log(ref)
    return this.af.database.list(ref);
  }*/
  getUID() {
    this.af.auth.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
    return this.uid;
  }
  getProvider() {
    this.af.auth.subscribe(user => {
      if (user) {
        this.provider = user.provider;
      }
    });
    return this.provider;
  }
  all(section) {
    return this.af.database.list(section);
  }
  allEstado(section) {
    //var data = $firebaseArray(ref.child(section).orderByChild('estado').equalTo(1));
    return this.af.database.list(section, {
      query: {
        orderByChild: 'estado',
        equalTo: '1'
      }
    });
  }
  getById(section, id) {
    return this.af.database.object(section + '/' + id);
  }
  getChild(section, id, childName) {
    return this.af.database.object(section + '/' + id + '/' + childName);
  }
  getCanton(section, id, childName, idCanton) {
    return this.af.database.object(section + '/' + id + '/' + childName + '/' + idCanton);
  }
  getEquiposUsuario(uid) {
    return this.get('JugadorEquipo', 'idJugador', uid).map(equipos => {
      for (let equipo of equipos) {
        equipo.info = this.getById('Equipo', equipo.idEquipo)
      }
      return equipos;
    });
  }
  getChilds(section, id, childName) {
    return this.af.database.list(section + '/' + id + '/' + childName);
  }
  get(section, field, value) {
    return this.af.database.list(section, {
      query: {
        orderByChild: field,
        equalTo: value
      }
    });
  }
  validateUserName(username) {
    return this.af.database.list('User', {
      query: {
        orderByChild: 'username',
        equalTo: username.toLowerCase()
      }
    });
  }
  /*buscar(query, tipo) {
    query = '*' + query + '*';
    var url = 'http://user:shBmco1c@104.198.62.40:80/elasticsearch/firebase/' + tipo + '/_search';
    let headers = new Headers({
      'Authorization': 'Basic ' + btoa('user:shBmco1c'),
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });
    var busqueda = {
      "from": 0,
      "size": 10,
      "query": {
        "query_string": {
          "query": query,
          "analyzer": "whitespace",
          "analyze_wildcard": true
        }
      }
    }
    return this.http.post(url, busqueda, { headers: headers }).map(res => res.json());
  }*/
  buscarPorCampo(query, searched, type) {
    query = '*' + query + '*';
    var key = this.af.database.list('search/' + 'request').push({ index: 'firebase', type: type, query: query, searched: searched }).key;
    return this.af.database.list('search/' + 'response/' + key + '/' + 'hits')
  }
  searchNested(type, query, path) {
    var key = this.af.database.list('search/' + 'request').push({ index: 'firebase', type: type, query: query, path: path }).key;
    return this.af.database.list('search/' + 'response/' + key + '/' + 'hits')
  }
  add(section, instancia) {
    return this.af.database.list(section).push(instancia).key;
  }
  save(section, id, instancia) {
    this.af.database.object('User/' + id).set(instancia);
    return id;
  }
  update(section, id, object) {
    this.af.database.object(section + '/' + id).update(object);
    return id;
  }
  allQuery(path, query){
    return this.af.database.list(path, query);
  }
  cambiarNumero(section, id, object) {
    this.af.database.object(section + '/' + id).update(object);
    return id;
  }
  addChild(id, section, instancia, childName) {
    this.af.database.object(section + '/' + id + '/' + childName).set(instancia);
  }
  addChildId(section, id, childName, idChild, instancia) {
    this.af.database.object(section + '/' + id + '/' + childName + '/' + idChild).set(instancia);
  }
  delete(section, id) {
    this.af.database.object(section + '/' + id).remove();
  }
  quit(section, id) {
    this.af.database.object(section + '/' + id).update({ estado: 0 });
  }
  subirFotoPerfil(_imageBlob) {
    let downloadURL;
    let uploadTask = firebase.storage().ref('perfil/' + this.getUID()).put(_imageBlob);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, error => {
        /*switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;
        }*/
      }, () => {
        // Upload completed successfully, now we can get the download URL
        downloadURL = uploadTask.snapshot.downloadURL;
      });
    if (downloadURL != null) {
      this.update('User', this.getUID(), { image: downloadURL })
    }
  }


  /*push(section: any, value: any): string {
    if (section == 'materias') {
      var key = this.af.database.list('users/' + this.uid + '/' + section + '_readable').push({ nombre: value.nombre }).key;
      this.af.database.object('users/' + this.uid + '/' + section + '/' + key).set(value);
      return key;
    }
    if (section == "notas") {
      return this.af.database.list('users/' + this.uid + '/' + section).push(value).key;
    }
  }
  saveImages(array:any, nota:any){
      
  }*/

}