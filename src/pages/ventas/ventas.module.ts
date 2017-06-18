import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ventas } from './ventas';

@NgModule({
  declarations: [
    Ventas,
  ],
  imports: [
    IonicPageModule.forChild(Ventas),
  ],
  exports: [
    Ventas
  ]
})
export class VentasModule {}
