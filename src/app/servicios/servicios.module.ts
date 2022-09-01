import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoServiciosComponent } from './mantenimiento-servicios/mantenimiento-servicios.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { apiService } from './api-service';

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
  ],
  providers: [HttpClientModule, apiService]
})
export class ServiciosModule { }
