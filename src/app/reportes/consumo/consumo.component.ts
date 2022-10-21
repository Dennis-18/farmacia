import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../service';
//spinner
import { NgxSpinnerService } from 'ngx-spinner';

import * as xlsx from 'xlsx';
@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  constructor(private reporteService: ReporteService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.consumoServicios();
  }

data:any = [
  {dato1: 1, dato2: 2, dato3:3, dato4:4, dato5:5}
]

columnas:any = [
  {descripcion: 'Cirugia Hombres'},
  {descripcion: 'Cirugia Mujeres'},
  {descripcion: 'Medicina Hombres'},
  {descripcion: 'Medicina Mujeres'},
  {descripcion: 'Ginecologia'}
]

filas:any = [
  
  {fila: 'PRODUCTO 1'},
  {fila: 'PRODUCTO 2'},
  {fila: 'PRODUCTO 3'},
  {fila: 'Anestesia'},
  {fila: 'Jeringas'},
  {fila: 'Gasa esteril'},
]

datos: any = [
  ['Producto 1',0,0,0,0,0],
  ['Producto 2',0,0,0,0,0]
]
table: boolean = false;

consumoServicios(){
  this.spinner.show('sp3');
  this.reporteService.consumoServicios().subscribe((data:any) => {
    if(data.id == 1) {
      this.table = true;
      console.log('respuesta positiva');
      this.datos = data.mensaje;
      this.columnas = data.servicios;
      console.log(data.servicios);
      this.spinner.hide('sp3');
      // console.log(data)
      
    } else{
      this.table = false;
    }
  })
}

exportData(){
  try{

    let elemento = document.getElementById('tb-consumo');
    if(elemento){
      console.log('existe tabla html')
    }
    const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);

    const book: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');

    xlsx.writeFile(book, 'Consumo.xlsx');
  } catch(error){
    console.log('error exportar archivo: ' + error);
  }
}

}
