import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  table = false;

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
