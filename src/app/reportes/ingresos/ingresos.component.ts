import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteService } from '../service';
import * as xlsx from 'xlsx';
import { apiService } from '../../servicios/api-service';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
              private reporteService: ReporteService,
              private apiService: apiService
    ) { }

  ngOnInit() {
    this.ingresosInventario();
    this.getProductos();
  }


  //guarda los datos para la busqueda de ingresos de producto y rangos de fecha
  productoBuscar = {
    id_producto: 0,
    fecha_inicio: '',
    fecha_fin: ''
  };
  productos: any; //guarda los productos para mostrarlos
  table: boolean = true; //mostrar o no la tabla dependiendo de su valor
  ingresos:any; //guarda los registros que devuelve la api

  //guarda los registros de la tabla en un archivo de excel
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
          // console.log(data.mensaje);
          this.spinner.hide('sp3');
        }
      })
    } catch(error){
      this.spinner.hide('sp3');
      console.log(`error ingresosInventario: ${error}`)
    }
  }


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
    // console.log(this.productoBuscar);
    try{
      this.reporteService.ingresos(this.productoBuscar).subscribe((data:any) =>{
        // console.log(data);
        if(data.id == 1){
          this.table = true;
          this.ingresos = data.mensaje;
        } else{
          this.table = false;
        }


      })
    } catch(error){
      console.log(error);
    }
  } 

  
}
