import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import { ReporteService } from '../service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  constructor(private service: ReporteService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    //carga los datos al iniciar el componente
    this.historialDespachos();
  }
  //define si se muestra la tabla
  //true si se muestra, false no
  table: boolean = false;
  //guarda los datos de despachos
  despachos: any;

  //carga los datos de despachos desde la bd
  exportData(){
    try{
  
      let elemento = document.getElementById('tb-despachos');
      if(elemento){
        console.log('existe tabla html')
      }
      const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);
  
      const book: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      xlsx.writeFile(book, 'Despachos.xlsx');
    } catch(error){
      console.log('error exportar archivo: ' + error);
    }
  }

  //obtiene los datos, realizando una peticion al servicio
  historialDespachos(){
    this.spinner.show('sp3');
    try{  
      this.service.historialDespachos().subscribe((data:any) => {
        if(data.id == 1){
          this.spinner.hide('sp3');
          this.table = true;
          this.despachos = data.mensaje;
        }
      })
    } catch(error){
      this.spinner.hide('sp3');
      console.log(`Error obtener datos: ${error}`)
    }
  }
}
