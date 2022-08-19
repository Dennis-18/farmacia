import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoProductosComponent } from './mantenimiento-productos/mantenimiento-productos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MantenimientoProductosComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MantenimientoProductosComponent
  ]
})
export class ProductosModule { }
