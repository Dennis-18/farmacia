import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoEmpleadosComponent } from './mantenimiento-empleados/mantenimiento-empleados.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MantenimientoEmpleadosComponent
  ],
  exports: [
    MantenimientoEmpleadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EmpleadosModule { }
