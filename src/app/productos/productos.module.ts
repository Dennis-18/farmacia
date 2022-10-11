import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoProductosComponent } from './mantenimiento-productos/mantenimiento-productos.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [MantenimientoProductosComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  exports: [
    MantenimientoProductosComponent
  ]
})
export class ProductosModule { }
