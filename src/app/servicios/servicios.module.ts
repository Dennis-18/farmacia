import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoServiciosComponent } from './mantenimiento-servicios/mantenimiento-servicios.component';




@NgModule({
  declarations: [MantenimientoServiciosComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MantenimientoServiciosComponent
  ]
})
export class ServiciosModule { }
