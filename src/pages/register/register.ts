import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../providers/firebase-service';
import { Login } from '../login/login';
import { Home } from '../home/home';

@IonicPage({
  name: 'register'
})
@Component({
  selector    : 'page-register',
  templateUrl : 'register.html',
})
export class Register {
  registerForm: FormGroup;

  constructor(
    public  navCtrl: NavController,
    public  navParams: NavParams,
    public  formBuilder: FormBuilder,
    public  firebaseService: FirebaseService
  ) {
    this.registerForm = this.createRegisterForm();
  }

  register() {
    let data = this.registerForm.value;
    console.log(data)
    this.firebaseService.register(data.email, data.pass).then( firebaseService => {
       alert('Registrado con exito!!')
       this.navCtrl.setRoot(Home);
    }, error => {
      alert(error)
    });
  }

  goToLogin(){
     this.navCtrl.push(Login);
  }

  private createRegisterForm(){
    return this.formBuilder.group({
      email : ['', Validators.required],
      pass  : ['', Validators.required]
    });
  }
}
