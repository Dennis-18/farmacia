import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteService } from '../service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
              private reporteService: ReporteService
    ) { }

  ngOnInit() {
    this.ingresosInventario();
  }

  table: boolean = true;
  ingresos:any;

  exportData(){
    try{
  
      let elemento = document.getElementById('tb-ingresos');
      if(elemento){
        console.log('existe tabla html')
      }
      const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);
  
      const book: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      xlsx.writeFile(book, 'Ingresos.xlsx');
    } catch(error){
      console.log('error exportar archivo: ' + error);
    }
  }

  //obtener ingresos
  ingresosInventario(){
    this.spinner.show('sp3');
    try{
      this.reporteService.historialIngresos().subscribe((data:any) => {
        if(data.id == 1){
          this.ingresos = data.mensaje;
          console.log(data.mensaje);
          this.spinner.hide('sp3');
        }
      })
    } catch(error){
      this.spinner.hide('sp3');
      console.log(`error ingresosInventario: ${error}`)
    }
  }
}
