import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { apiService } from '../servicios/api-service';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  constructor(private router: Router, private apiService: apiService) { }

  ngOnInit() {
    this.productos();
    this.servicios();
  }

  alerta = 0;
  precio_unitario:number=0;
  //'2008/12/31 13:00:00.59'
  
  despacho_producto = {
    id_producto: 0,
    cantidad: 0,
    fecha_hora: '',
    usuario: localStorage.getItem('id_usuario'),
    tipo_movimiento: 2,
    lote: 0,
    fecha_vencimiento: '',
    id_servicio: 0,
    unidad_medida: '',
    no_referencia: ''
  }
  precio_total:number = 0;
  datos_productos: any;
  data_lotes: any;
  data_servicios: any;
  
  precioTotal(event:Event){
   this.precio_total = this.despacho_producto.cantidad * this.precio_unitario;;
    
}

fecha(){

  let date: Date = new Date();
 let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let secods = date.getSeconds();
  let miliSeconds = date.getMilliseconds();

  let timestamp = year+'-'+month+'-'+day+' ' + hour + ':'+minute +':'+secods+'.'+miliSeconds;
  this.despacho_producto.fecha_hora = timestamp;
}

productos(){
  // this.alerta = 0;
  this.apiService.productos().subscribe((data:any) =>{
    // console.log(data);
    if(data){
      this.datos_productos = data;
      // console.table(this.datos_productos);
    }
  })
  // console.log(data);
  // console.log(this.datos_productos);
}

inventario(){

  this.fecha();
  // console.table(this.despacho_producto);
  this.apiService.inventario(this.despacho_producto).subscribe((data:any) =>{
    if(data.id == 1){
      // console.log('todo bien ' + data.mensaje);
      this.alerta = 1;
      setTimeout(() => {
        this.alerta = 0;
      }, 2500)
      this.despacho_producto = {
        id_producto: 0,
        cantidad: 0,
        fecha_hora: '',
        usuario: localStorage.getItem('id_usuario'),
        tipo_movimiento: 2,
        lote: 0,
        fecha_vencimiento: '',
        id_servicio: 0,
        unidad_medida: '',
        no_referencia: ''
      }



    }
    else{
      if(data.id == 2){
        this.router.navigate(['/login']);
      } else{
        this.alerta = 2;
        setTimeout(() => {
          this.alerta = 0;
        }, 2500)
        console.log('ocurrio un error: ' + data.mensaje);
      }
    }
  })

}

//recupera los diferentes lotes que existen para un producto
lotes(event: any){
  // console.log('lotes');
  this.buscar_precio_unitario(this.despacho_producto.id_producto);
  this.apiService.lotes(this.despacho_producto.id_producto).subscribe((data:any) =>{
    if(data.id == 1){
      // console.log('hay lotes');
      this.data_lotes = data.mensaje;
      // console.log(data.mensaje);
    } else{
      this.data_lotes = '';

      this.alerta = 3;
    }
    // console.log(data.mensaje);
    // console.log('no hay lotes');
  })
}

buscar_precio_unitario(id_producto: any){
  let precio = this.datos_productos.filter((producto:any) => producto.id_producto == id_producto);
  if(precio[0].precio_unitario !== null){
    this.precio_unitario = precio[0].precio_unitario;
  }
}

select_fecha(event: any){
  let lote = this.data_lotes.filter((lote:any) => lote.lote == this.despacho_producto.lote);
  this.despacho_producto.fecha_vencimiento = lote[0].fecha_vencimiento.substring(0,10);
  // console.table(lote);
}
salir(){
  this.router.navigate(['/menu']);
}

servicios(){
  this.apiService.services().subscribe((data:any) =>{
    if(data.id == 1){
      this.data_servicios = data.mensaje;
      // console.table(this.data_servicios);
    } else{
      console.log('no trajo nada esta madre: ' + data.mensaje);
    }
  })
}

}
