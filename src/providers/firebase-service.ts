import { Injectable } from '@angular/core';
import firebase       from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  public fireAuth: any;
  public userData: any;
  
  constructor(public afd : AngularFireDatabase
    ) {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData');
  }

  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        console.log('register function')
        //this.userData.child(newUser.uid).set({email: email});
      });
  }
  logout(): any {
    return this.fireAuth.signOut();
  }
  getItems() {
    let user = firebase.auth().currentUser.uid;
    return this.afd.list('reservas', ref => ref.orderByChild("uid").equalTo(user));
  }
  addItem(obj) {
    this.afd.list('/reservas/').push(obj).then(_ => alert('reserva añadida, esperar confirmacion!'));
  }
  removeItem(reserva) {
    this.afd.list('/reservas/').remove(reserva.key).then(_ => alert('reserva anulada!'));
  }
  updateItem(reserva) {
    let reservas = this.afd.list('/reservas/')
    reservas.update( reserva.key,{
        nombre     : reserva.nombre,
        comensales : reserva.comensales,
        telefono   : reserva.telefono,
        email      : reserva.email,
        fecha      : reserva.fecha,
        hora       : reserva.hora,
        uid        : reserva.uid,
        approved   : reserva.approved,
        key        : reserva.key,
        display    : reserva.display
      });
    }
}

    