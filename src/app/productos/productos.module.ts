import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoProductosComponent } from './mantenimiento-productos/mantenimiento-productos.component';


@NgModule({
  declarations: [MantenimientoProductosComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MantenimientoProductosComponent
  ]
})
export class ProductosModule { }
