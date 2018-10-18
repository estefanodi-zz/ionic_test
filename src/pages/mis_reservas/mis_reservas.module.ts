import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisReservas } from './mis_reservas';

@NgModule({
  declarations: [
    MisReservas,
  ],
  imports: [
    IonicPageModule.forChild(MisReservas),
  ],
  exports: [
    MisReservas
  ]
})
export class MisReservasModule {}