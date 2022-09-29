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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'servicios', component: MantenimientoServiciosComponent},
  {path: 'productos', component: MantenimientoProductosComponent},
  {path: 'empleados', component: MantenimientoEmpleadosComponent},
  {path: 'despacho', component: DespachoComponent},
  {path: 'ingreso', component: IngresoComponent},
  {path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
