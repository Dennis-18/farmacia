import { Component, OnInit } from '@angular/core';
import { apiService } from '../../servicios/api-service';
import { ReporteService } from '../service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css']
})
export class TrazabilidadComponent implements OnInit {

  constructor(private apiService: apiService,
    private reporte: ReporteService) { }

  ngOnInit() {
    this.getProductos();
  }

  productoBuscar= {
    id_producto: 0,
    fecha_inicio: '',
    fecha_fin: ''
  }
  table: boolean = true;

productos: any; //guarda el listado de productos
registros: any; //guarda los resultados de la busqueda
//obtener datos de produtos registrados
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

  buscarProducto(event: Event){
    console.log(this.productoBuscar);
    this.reporte.movimientos(this.productoBuscar).subscribe((data:any) =>{
      // console.log(data);
      if(data.id == 1){
        console.log(data.mensaje);
        this.registros = data.mensaje;
        this.table = true;

      } else{
        this.table = false;
      }
    })
  } 

  //guarda los datos en un archivo de excel
  exportData(){
    try{
  
      let elemento = document.getElementById('tb-historial');
      if(elemento){
        console.log('existe tabla html')
      }
      const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);
  
      const book: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      xlsx.writeFile(book, 'Historial.xlsx');
    } catch(error){
      console.log('error exportar archivo: ' + error);
    }
  }
   
}
