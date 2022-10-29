import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoComponent } from './despacho.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { apiService } from '../login/api.service';

//rutas
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [DespachoComponent],
  exports: [DespachoComponent],
  providers: [HttpClientModule, apiService,{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class DespachoModule { }
