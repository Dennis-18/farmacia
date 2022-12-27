import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { EmpleadosModule } from './empleados/empleados.module';
import { ProductosModule } from './productos/productos.module';
import { ServiciosModule } from './servicios/servicios.module';

import { PruebasService } from './shared/services/pruebas.service';

import { apiService } from './login/api.service';
import { DespachoModule } from './despacho/despacho.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { ReportesModule } from './reportes/reportes.module';
import { AjustesInventarioModule } from './Ajustes-inventario/Ajustes-inventario.module';
import { TurnosComponent } from './turnos/turnos.component';
import { TurnoComponent } from './turno/turno.component';
import { service } from './turnos/service';
import { ApiRoute } from './api-route';
import { SaldosComponent } from './turnos/saldos/saldos.component';


@NgModule({
  declarations: [					
    AppComponent,
    LoginComponent,
    MenuComponent,
      TurnosComponent,
      TurnoComponent,
      SaldosComponent
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    EmpleadosModule,
    ProductosModule,
    ServiciosModule,
    FormsModule,
    HttpClientModule,
    DespachoModule,
    IngresoModule,
    ReportesModule,
    AjustesInventarioModule
  ],

  providers: [PruebasService, apiService, service, ApiRoute],

  bootstrap: [AppComponent]
})
export class AppModule { }
