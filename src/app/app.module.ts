import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp }        from './app.component';
import { Login }        from '../pages/login/login';
import { Register }     from '../pages/register/register';
import { Home   }       from '../pages/home/home';
import { MisReservas }  from '../pages/mis_reservas/mis_reservas';
 
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import {  FirebaseService  } from './../providers/firebase-service';
import {   firebaseConfig  } from './credentials.backup';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    Home,
    MisReservas,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Register,
    Home,
    MisReservas,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
