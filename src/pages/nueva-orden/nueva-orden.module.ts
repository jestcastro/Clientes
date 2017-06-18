import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaOrden } from './nueva-orden';

@NgModule({
  declarations: [
    NuevaOrden,
  ],
  imports: [
    IonicPageModule.forChild(NuevaOrden),
  ],
  exports: [
    NuevaOrden
  ]
})
export class NuevaOrdenModule {}
