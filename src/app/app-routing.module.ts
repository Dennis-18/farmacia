import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MantenimientoEmpleadosComponent } from './empleados/mantenimiento-empleados/mantenimiento-empleados.component';
import { MantenimientoProductosComponent } from './productos/mantenimiento-productos/mantenimiento-productos.component';
import { MantenimientoServiciosComponent } from './servicios/mantenimiento-servicios/mantenimiento-servicios.component';
import { DespachoComponent } from './despacho/despacho.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DashboardComponent } from './reportes/dashboard/dashboard.component';
import { DespachosComponent } from './reportes/despachos/despachos.component';
import { ExistenciasComponent } from './reportes/existencias/existencias.component';
import { MetricasComponent } from './reportes/metricas/metricas.component';
import { ValorizadoComponent } from './reportes/valorizado/valorizado.component';
import { ConsumoComponent } from './reportes/consumo/consumo.component';
import { KardexComponent } from './reportes/kardex/kardex.component';
import { AjustesInventarioComponent } from './Ajustes-inventario/Ajustes-inventario.component';
import { IngresosComponent } from './reportes/ingresos/ingresos.component';
import { TrazabilidadComponent } from './reportes/trazabilidad/trazabilidad.component';
import { TurnosComponent } from './turnos/turnos.component';
import { TurnoComponent } from './turno/turno.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'servicios', component: MantenimientoServiciosComponent},
  {path: 'productos', component: MantenimientoProductosComponent},
  {path: 'empleados', component: MantenimientoEmpleadosComponent},
  {path: 'despacho', component: DespachoComponent},
  {path: 'ingreso', component: IngresoComponent},
  {path: 'ajustes-inventario', component: AjustesInventarioComponent},
  {path: 'turnos', component: TurnosComponent}, 
  {path: 'turno/:turno', component: TurnoComponent},
  {path: 'reportes', component: ReportesComponent, children:[
    {path: 'dashboard', component: DashboardComponent},
    {path: 'r-despachos', component: DespachosComponent},
    {path: 'existencias', component: ExistenciasComponent},
    {path: 'metricas', component: MetricasComponent},
    {path: 'valorizado', component: ValorizadoComponent},
    {path: 'consumo', component: ConsumoComponent},
    {path: 'kardex', component: KardexComponent},
    {path: 'ingresos', component: IngresosComponent},
    {path: 'trazabilidad', component: TrazabilidadComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
