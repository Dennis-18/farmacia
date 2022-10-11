import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespachosComponent } from './despachos/despachos.component';
import { ExistenciasComponent } from './existencias/existencias.component';
import { MetricasComponent } from './metricas/metricas.component';
import { HttpClientModule } from '@angular/common/http';
import { ReporteService } from './service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
    
  ],
  declarations: [ReportesComponent, NavComponent,DashboardComponent,DespachosComponent, ExistenciasComponent,MetricasComponent],
  exports: [ReportesComponent],
  providers: [ReporteService]
})
export class ReportesModule { }
