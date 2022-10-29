import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoComponent } from './ingreso.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { apiService } from '../servicios/api-service';

//rutas
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [IngresoComponent],
  exports: [IngresoComponent],
  providers: [HttpClientModule, apiService, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class IngresoModule { }
