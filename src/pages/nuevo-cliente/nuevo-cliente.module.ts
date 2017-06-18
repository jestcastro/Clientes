import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoCliente } from './nuevo-cliente';

@NgModule({
  declarations: [
    NuevoCliente,
  ],
  imports: [
    IonicPageModule.forChild(NuevoCliente),
  ],
  exports: [
    NuevoCliente
  ]
})
export class NuevoClienteModule {}
