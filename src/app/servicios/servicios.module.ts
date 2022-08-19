import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoServiciosComponent } from './mantenimiento-servicios/mantenimiento-servicios.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
//paginacion
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [MantenimientoServiciosComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule
    
  ],
  exports: [
    MantenimientoServiciosComponent
  ]
})
export class ServiciosModule { }
