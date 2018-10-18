import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../providers/firebase-service';
import { Register} from '../register/register';
import { Home } from '../home/home';

@IonicPage({
  name: 'login'
})
@Component({
  selector    : 'page-login',
  templateUrl : 'login.html',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    public  navCtrl: NavController,
    public  navParams: NavParams,
    public  formBuilder: FormBuilder,
    public  firebaseService: FirebaseService
  ) {
    this.loginForm = this.createLoginForm();
  }

  login() {
      let data = this.loginForm.value;
      this.firebaseService.doLogin(data.email, data.pass).then( firebaseService => {
        this.navCtrl.setRoot(Home);
      }, error => {
         alert(error)
      });
  }

  goToRegister(){
     this.navCtrl.push(Register);
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email : ['', Validators.required],
      pass  : ['', Validators.required]
    });
  }
}
