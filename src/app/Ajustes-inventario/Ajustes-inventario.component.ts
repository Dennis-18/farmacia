import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
//import servicio de productos
import { ProductosService } from '../shared/services/productos.service';
import { apiService } from '../servicios/api-service';
import { NgxIzitoastService } from 'ngx-izitoast';
@Component({
  selector: 'app-Ajustes-inventario',
  templateUrl: './Ajustes-inventario.component.html',
  styleUrls: ['./Ajustes-inventario.component.css']
})
export class AjustesInventarioComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
              private productosService: ProductosService,
              private apiService: apiService,
              private iziToast: NgxIzitoastService,
              private router: Router
    ) { }

  ngOnInit() {
    this.getProducts();
    this.obtenerAjustes();
    this.ajuste.id_turno = localStorage.getItem('id_turno');
  }
  //muestra o no la tabla dependiendo de su valor
  table: boolean = false;

  //guarda los datos de un ajuste para enviarlos a la api
  ajuste: ajuste = {
    id_producto: 0,
    lote: '',
    fecha_movimiento: '',
    cantidad_ajuste: 0,
    tipo_ajuste: 0,
    descripcion: '',
    usuario: '0',
    id_turno: localStorage.getItem('id_turno')
  }

  //guarda los tipos de movimientos posibles para los ajustes
  tipos_movimiento = [
    {value: 1, descripcion: 'Suma'},
    {value: 2, descripcion: 'Resta'}
  ]
  ajustes: any;
  productos: any;
  data_lotes: any;


  //si es true, el lote esta deshabilitado
  lote: boolean = true;
  //cargar los productos para hacer el ajuste
  getProducts(){
    try{
      this.productosService.getProducts().subscribe((data:any) => {
        if(data){
          // console.log(data);
          this.productos = data;
          // console.log(this.productos);
        } else{
          console.log('no hay productos');
        }
      })
    } catch(error){
      console.log(error);
    }
  }
  //cargar los lotes de ese producto para seleccionarlo
  getLotes(event: Event){
      console.log('lotes');
      // console.log(`event: ${event.target}`)
      // this.data_lotes = '';
      try{
        this.apiService.lotes(this.ajuste.id_producto).subscribe((data:any) =>{
          if(data.id == 1){
            console.log('hay lotes');
            this.data_lotes = data.mensaje;
            this.lote = false;
            console.log(data.mensaje);
          } else{
            // this.data_lotes = '';
            this.data_lotes = [{
              lote: '1'
            }];
            this.lote= true;
          }
        })
      } catch(error){
        this.data_lotes = [{
          lote: '1'
        }];
        this.lote = true;
        console.log(`error catch getLotes ${error}`);
      }
  }
  //obtener ajustes de inventario realizados para el producto seleccionado
  obtenerAjustes(){
    this.spinner.show('sp');
    try{
      this.apiService.obtenerAjustes().subscribe((data:any) => {
        if(data.id == 1){
          this.ajustes = data.mensaje;
          this.spinner.hide('sp');
          this.table = true;
        } else if(data.id == 3){
          this.spinner.hide('sp');
        }
        else{
          this.spinner.hide('sp');
          this.error();
        }

      })
    } catch(error){
      console.log('error catch obtenerAjustes: ' + error);
      this.error();
      this.spinner.hide('sp');
    }

  }

  //obterner ajustes generales, los ultimos ajustes sin importar
  //usuario o producto, ordenados por fecha


  //guardar timestamp
  fecha(){

    let date: Date = new Date();
   let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    let miliSeconds = date.getMilliseconds();
  
    let timestamp = year+'-'+month+'-'+day+' ' + hour + ':'+minute +':'+seconds;
    this.ajuste.fecha_movimiento = timestamp;
  }

  //guardar el ajuste de inventario
  guardarAjuste(){
    try{
      if(this.ajuste.tipo_ajuste == 1){
        this.ajuste.descripcion = 'Suma';
      } else{
        this.ajuste.descripcion = 'Resta';
      }
      this.fecha();
      this.ajuste.usuario = localStorage.getItem('id_usuario');
      // console.table(this.ajuste);
      //enviar ajuste por medio de la api-rest
      this.apiService.ajusteInventario(this.ajuste).subscribe((data:any) => {
        if(data.id == 1){
          console.log('correcto')
          this.ajuste = {
            id_producto: 0,
            lote: '',
            fecha_movimiento: '',
            cantidad_ajuste: 0,
            tipo_ajuste: 3,
            descripcion: '',
            usuario: '0',
            id_turno: localStorage.getItem('id_turno')
          }

          this.notifi();
          this.obtenerAjustes();
        } else{
          console.log('incorrecto')
        }
      })
    } catch(error){
      console.log(`error catch guardarAjuste ${error}`);
    }
  }

  //notificaciones con izitoast, exito
  notifi(){
    this.iziToast.show({
      title: "Registro ingresado correctamente",
      class: "foo",
      progressBarColor: "green",
      timeout: 2500,
      onClosed: () => {
        console.log("closed");
      }
    })
  }

  //notificacion de error
  error(){
    this.iziToast.show({
      title: "Ocurrio un Error, intenelo de nuevo",
      class: "foo",
      progressBarColor: "red",
      timeout: 2500,
      onClosed: () => {
        console.log("closed");
      }
    })
  }

  //salir del modulo
  salir(){
    this.router.navigate(['/menu']);
  }


}


interface ajuste {
  id_producto: number,
  lote: string,
  fecha_movimiento: Date | string,
  cantidad_ajuste: number,
  tipo_ajuste: number,
  descripcion: string,
  usuario: string | null,
  id_turno: string | null
}