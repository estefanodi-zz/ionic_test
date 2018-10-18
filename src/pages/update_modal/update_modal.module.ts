import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateModal } from './update_modal';

@NgModule({
  declarations: [
    UpdateModal,
  ],
  imports: [
    IonicPageModule.forChild(UpdateModal),
  ],
  exports: [
    UpdateModal
  ]
})
export class UpdateModalModule {}
