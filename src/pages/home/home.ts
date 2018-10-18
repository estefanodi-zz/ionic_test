import {   Component     } from '@angular/core';
import { FirebaseService } from './../../providers/firebase-service';
import { Login } from '../login/login';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireList } from 'angularfire2/database';
import { MisReservas     } from '../mis_reservas/mis_reservas'
import firebase from 'firebase'

@IonicPage({
  name: 'home'
})
@Component({
  selector    : 'page-home',
  templateUrl : 'home.html'
})
export class Home { 
  myForm: FormGroup;
  bookings: AngularFireList<any>;

  constructor(
    public  navCtrl: NavController,
    public  navParams: NavParams,
    public  firebaseService: FirebaseService,
    public  formBuilder: FormBuilder
  ) {
    this.myForm = this.createMyForm();
  }

  async addItem(){
     let id      = firebase.auth().currentUser.uid;
     let data    = this.myForm.value;
     let reserva = {
          nombre     : data.nombre,
          comensales : data.comensales,
          telefono   : data.telefono,
          email      : data.email,
          fecha      : data.fecha,
          hora       : data.hora,
          approved   : 'pendiente',
          display    : true,
          uid        : id
      }
     await this.firebaseService.addItem(reserva);
     await this.navCtrl.push(MisReservas);
     await this.myForm.reset();
  }

  goToMisReservas(){
    this.navCtrl.push(MisReservas);
  }

  private createMyForm(){
    return this.formBuilder.group({
      nombre     : ['', Validators.required],
      comensales : ['', Validators.required],
      email      : ['', Validators.required],
      telefono   : ['', Validators.required],
      fecha      : ['', Validators.required],
      hora       : ['', Validators.required]
    });
  }

  async logout() {
    await this.firebaseService.logout();
          this.navCtrl.push(Login);
  }
}



