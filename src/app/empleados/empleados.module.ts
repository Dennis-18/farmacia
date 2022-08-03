import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoEmpleadosComponent } from './mantenimiento-empleados/mantenimiento-empleados.component';



@NgModule({
  declarations: [
    MantenimientoEmpleadosComponent
  ],
  exports: [
    MantenimientoEmpleadosComponent
  ],
  imports: [

  ]
})
export class EmpleadosModule { }
