import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tipos } from './productos';

@NgModule({
  declarations: [
    Tipos,
  ],
  imports: [
    IonicPageModule.forChild(Tipos),
  ],
  exports: [
    Tipos
  ]
})
export class TiposModule {}
