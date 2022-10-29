import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoEmpleadosComponent } from './mantenimiento-empleados/mantenimiento-empleados.component';
import { FormsModule } from '@angular/forms';
//importar la paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from '../app-routing.module';

//rutas
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    MantenimientoEmpleadosComponent
  ],
  exports: [
    NgxPaginationModule,
    MantenimientoEmpleadosComponent,
    FormsModule,
    AppRoutingModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class EmpleadosModule { }
