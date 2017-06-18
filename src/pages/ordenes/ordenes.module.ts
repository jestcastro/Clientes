import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ordenes } from './ordenes';

@NgModule({
  declarations: [
    Ordenes,
  ],
  imports: [
    IonicPageModule.forChild(Ordenes),
  ],
  exports: [
    Ordenes
  ]
})
export class OrdenesModule {}
