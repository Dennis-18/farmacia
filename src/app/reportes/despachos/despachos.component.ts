import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import { ReporteService } from '../service';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiService } from '../../servicios/api-service';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  constructor(private service: ReporteService,
    private spinner: NgxSpinnerService,
    private apiService: apiService
    ) { }

  ngOnInit() {
    //carga los datos al iniciar el componente
    this.historialDespachos();
    this.getProductos();
  }
  //define si se muestra la tabla
  //true si se muestra, false no
  table: boolean = false;
  //guarda los datos de despachos
  despachos: any; //guarda el resultado que retorna la api para los despachos
  productos: any; //guarda el listado de productos
  producto = {
    id_producto: 0,
    fecha_inicio: '',
    fecha_fin: ''
  }
  //guarda los datos en un archivo de excel
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

  //obtener productos
  getProductos(){
    // this.alerta = 0;
    this.apiService.productos().subscribe((data:any) =>{
      // console.log(data);
      if(data){
        this.productos = data;
        // console.table(this.datos_productos);
      }
    })
    // console.log(data);
    // console.log(this.datos_productos);
  }

  //obtiene despachos filtrados por producto y rango de fechas
  despachosFiltrados(event: Event){
    console.log(this.producto);
    try{
      this.service.despachosFiltrados(this.producto).subscribe((data:any) => {
        if(data.id == 1){
          this.table = true;
          this.despachos = data.mensaje;
        }

        if(data.id == 3){
          this.table = false;
        }
      })
    } catch(error){
        console.log(error);
    }
  }
}
