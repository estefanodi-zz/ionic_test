import { Component  } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Modal, 
         ModalController, 
         ModalOptions, 
         IonicPage, 
         NavController,
         AlertController } from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@IonicPage({
  name: 'mis_reservas'
})
@Component({
  selector    : 'page-mis_reservas',
  templateUrl : 'mis_reservas.html'
})

export class MisReservas {
  reservasRef;
  reservas   : Observable<any[]>;
  constructor(
    public  navCtrl         : NavController,
    public  firebaseService : FirebaseService,
    public  modal           : ModalController,
    public  alertCtrl       : AlertController,

  ) {
    this.reservasRef = this.firebaseService.getItems()
    this.reservas    = this.reservasRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  } 
  remove(reserva){
    let message = this.alertCtrl.create({
          title: "Cancelar Reserva",
          message: "Quieres cancelar tu reserva?",
          buttons: [
            {
              text: 'NO',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'SI',
              handler: data => {
                this.firebaseService.removeItem(reserva)
              }
            },
          ]
        }) 
    message.present( message );
  } 
  openModal(reserva){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModal: Modal = this.modal.create('UpdateModal', { data: reserva }, myModalOptions);
       
      reserva.approved != 'pendiente'
    ? this.openAlert(reserva)
    : myModal.present()

    myModal.onWillDismiss((reserva) => {
      this.firebaseService.updateItem(reserva)
    })
  }
  openAlert(reserva) {
      let message;
      reserva.approved === 'confirmado'
      ?  message = this.alertCtrl.create({
          title: "Tu reserva ya esta confirmada",
          message: "Para mayor informacion llama el numero 1234567890",
          buttons: [
            {
              text: 'Entendido',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        })
      : message = this.alertCtrl.create({
          title: "Tu reserva ha sido rechazada",
          message: "Quieres eliminarla de la lista?",
          buttons: [
            {
              text: 'NO',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'SI',
              handler: data => {
                this.firebaseService.removeItem(reserva)
              }
            },
          ]
        }) 
    message.present( message );
  }
}