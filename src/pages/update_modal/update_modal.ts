import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector    : 'page-update_modal',
  templateUrl : 'update_modal.html',
})
export class UpdateModal {
  myForm : FormGroup;
  data     = this.navParams.get('data');
  constructor(public navParams: NavParams, 
              public view: ViewController,
              public formBuilder: FormBuilder,
  ) {
    this.myForm   = this.createMyForm();
  }

  sendData() {
     let formData = this.myForm.value;
     let data     = this.navParams.get('data');
     let reserva  = {
          nombre     : formData.nombre,
          comensales : formData.comensales,
          telefono   : formData.telefono,
          email      : formData.email,
          fecha      : formData.fecha,
          hora       : formData.hora,
          key        : data.key,
          approved   : data.approved,
          display    : data.display,
          uid        : data.uid
      }
    this.view.dismiss(reserva);
  }
  closeModal() {
    this.view.dismiss();
  }
  private createMyForm(){
    return this.formBuilder.group({
      nombre     : [this.data.nombre, Validators.required],
      comensales : [this.data.comensales, Validators.required],
      email      : [this.data.email, Validators.required],
      telefono   : [this.data.telefono, Validators.required],
      fecha      : [this.data.fecha, Validators.required],
      hora       : [this.data.hora, Validators.required]
    });
  }
}
