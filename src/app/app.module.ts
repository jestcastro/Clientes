import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


import { AutoCompleteModule } from 'ionic2-auto-complete';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NuevoCliente } from "../pages/nuevo-cliente/nuevo-cliente"
import { NuevaOrden } from "../pages/nueva-orden/nueva-orden"
import { Productos } from "../pages/productos/productos"
import { Tipos } from "../pages/tipos/tipos"
import { Ordenes } from '../pages/ordenes/ordenes';
import { Ventas } from '../pages/ventas/ventas';



import { ChartsModule } from 'ng2-charts';
import '../../node_modules/chart.js/src/chart.js';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthData } from '../providers/auth-data';
import { Fire } from '../providers/fire';
import { CompleteService } from '../providers/complete-service';
import { ProductoService } from '../providers/productos-service';

export const firebaseConfig = {
  apiKey: "AIzaSyAyg9t4JZ4Z-jvBga4s2oqL6yzbWzMPSoo",
  authDomain: "hermanosquirospagina.firebaseapp.com",
  databaseURL: "https://hermanosquirospagina.firebaseio.com",
  projectId: "hermanosquirospagina",
  storageBucket: "hermanosquirospagina.appspot.com",
  messagingSenderId: "599230061844"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Ordenes,
    Productos,
    Tipos,
    NuevoCliente,
    NuevaOrden,
    Ventas
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AutoCompleteModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Ordenes,
    Productos,
    Tipos,
    ListPage,
    NuevoCliente,
    NuevaOrden,
    Ventas
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthData,
    Fire,
    CompleteService,
    ProductoService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
