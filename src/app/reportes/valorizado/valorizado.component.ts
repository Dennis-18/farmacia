import { Component, OnInit } from '@angular/core';
//spinner
import { NgxSpinnerService } from 'ngx-spinner';

import { ReporteService } from '../service';

//exportar excel
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-valorizado',
  templateUrl: './valorizado.component.html',
  styleUrls: ['./valorizado.component.css']
})
export class ValorizadoComponent implements OnInit {


  constructor(private service: ReporteService,
              private spinner: NgxSpinnerService,
          
    ) { }


  ngOnInit() {
    this.datosValorizado();
  }
columnas:any = [
  {descripcion: 'Cirugia Hombres'},
  {descripcion: 'Cirugia Mujeres'},
  {descripcion: 'Medicina Hombres'},
  {descripcion: 'Medicina Mujeres'},
  {descripcion: 'Ginecologia'}
]

datos: any = [
  ['Producto 1',0,0,0,0,0],
  ['Producto 2',0,0,0,0,0]
]

table: boolean = false;

datosValorizado(){
  this.spinner.show('sp3');
  this.service.valorizado().subscribe((data:any) => {
    if(data.id == 1){
      this.table = true;
      this.columnas = data.servicios;
      this.datos = data.mensaje;
      this.spinner.hide('sp3');
    }
  })
}

exportData(){
  try{

    let elemento = document.getElementById('tb-valorizado');
    if(elemento){
      console.log('existe tabla html')
    }
    const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);

    const book: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');

    xlsx.writeFile(book, 'Valorizado.xlsx');
  } catch(error){
    console.log('error exportar archivo: ' + error);
  }
}

}
