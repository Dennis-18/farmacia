import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesInventarioComponent } from './Ajustes-inventario.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { apiService } from '../login/api.service';
import { ProductosService } from '../shared/services/productos.service';
import { NgxIziToastModule } from 'ngx-izitoast';

//rutas
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxIziToastModule
  ],
  declarations: [AjustesInventarioComponent],
  exports: [AjustesInventarioComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule, apiService, ProductosService,{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AjustesInventarioModule { }
