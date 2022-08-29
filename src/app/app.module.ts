import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { EmpleadosModule } from './empleados/empleados.module';
import { ProductosModule } from './productos/productos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PruebasService } from './shared/services/pruebas.service';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    EmpleadosModule,
    ProductosModule,
    ServiciosModule,
    FormsModule
  ],
  providers: [PruebasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
