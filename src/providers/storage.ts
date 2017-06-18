import { Injectable } from '@angular/core';
//import { Fire } from '../providers/fire';
import 'rxjs/add/operator/map';
import firebase from 'firebase'


@Injectable()
export class Storage {
    constructor() {

    }
    uploadImageBase64(base64, section, filename, extension) {
        let ref = firebase.storage().ref().child(section).child(filename + '.' + extension)
        return ref.putString(base64, 'base64', { contentType: 'image/' + extension });
    }
    exist(section, filename, extension) {
        let existe = false;
        let ref = firebase.storage().ref().child(section).child(filename + '.' + extension)
        ref.getDownloadURL().then(
            url => {
                let existe = true;
            }, (error) => {
                existe = !(error['code'] == 'storage/object-not-found')
            });
        return existe;
    }
    downloadURL(section, filename, extension) {
        let url: any;
        let ref = firebase.storage().ref().child(section).child(filename + '.' + extension)
        ref.getDownloadURL().then(
            url => {
                url = url;
            }, (error) => {
                url = error['code'];
            });
        return url;
    }
}
