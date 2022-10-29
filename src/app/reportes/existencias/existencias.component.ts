import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import { ReporteService } from '../service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent implements OnInit {

  constructor(private service: ReporteService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {
    this.existencias();
  }

  table = false;
  inventario: any;

  //funcion que toma los datos de la tabla html y los guarda en un archivo excel
  exportData(){
    try{
  
      let elemento = document.getElementById('tb-consumo');
      if(elemento){
        console.log('existe tabla html')
      }
      const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);
  
      const book: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      xlsx.writeFile(book, 'Existencias.xlsx');
    } catch(error){
      console.log('error exportar archivo: ' + error);
    }
  }

  //carga los datos de existencias de inventario desde la base de datos
  existencias(){
    console.log(`existencias`)
    this.spinner.show('sp3');
    try{
      this.service.existencias().subscribe((data:any) => {
        if(data.id == 1){
          this.table = true;
          console.log(`hay existencias`)
          this.inventario = data.mensaje;
          this.spinner.hide('sp3');
          // console.log(this.inventario);
        }
      })
    } catch(error){
      this.spinner.hide('sp3');
      console.log(`error en existencias: ${error}`)
    }
  }
}
