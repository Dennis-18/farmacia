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
import { ConsumoComponent } from './consumo/consumo.component';
import { KardexComponent } from './kardex/kardex.component';
import { ValorizadoComponent } from './valorizado/valorizado.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { IngresosComponent } from './ingresos/ingresos.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  declarations: [ReportesComponent, NavComponent,DashboardComponent,DespachosComponent, 
    ExistenciasComponent,MetricasComponent, ConsumoComponent, KardexComponent,ValorizadoComponent,
    AjustesComponent, IngresosComponent],
  exports: [ReportesComponent],
  providers: [ReporteService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportesModule { }
