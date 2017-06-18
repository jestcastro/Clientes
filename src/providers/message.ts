import { Injectable } from '@angular/core';
import { ActionSheetController, ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class Message {
    public loading;
    constructor(public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController) {

    }
    showToastAndDismiss(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
        this.loading.dismiss();
    }
    showToast(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
    showLoading() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
      <img src="assets/images/loading.gif" width="40" height="40" style="width: 50px !important; height: 50px !important"/>`
        });
        this.loading.present();
    }
    hideLoading() {
        this.loading.dismiss();
    }
}
