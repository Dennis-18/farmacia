import { Component, OnInit } from '@angular/core';
import { apiService } from '../servicios/api-service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(private apiService: apiService, private router: Router) { }

  ngOnInit() {
    this.productos();
  }


alerta = 0;
  

//'2008/12/31 13:00:00.59'

ingreso_producto = {
  id_producto: 0,
  cantidad: 0,
  fecha_hora: '',
  usuario: localStorage.getItem('id_usuario'),
  tipo_movimiento: 1,
  lote: '',
  fecha_vencimiento: '',
  id_turno: localStorage.getItem('id_turno')
}

datos_productos: any;


fecha(){

  let date: Date = new Date();
 let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let secods = date.getSeconds();

  let timestamp = year+'-'+month+'-'+day+' ' + hour + ':'+minute +':'+secods;
  this.ingreso_producto.fecha_hora = timestamp;
}

productos(){
  this.apiService.productos().subscribe((data:any) =>{
    // console.log(data);
    if(data){
      console.log('hay productos');
      this.datos_productos = data;
    }
  })
  // console.log(data);
  // console.log(this.datos_productos);
}



inventario(){

  this.fecha();
  console.table(this.ingreso_producto);
  this.apiService.inventario(this.ingreso_producto).subscribe((data:any) =>{
    if(data.id == 1){
      console.log('todo bien ' + data.mensaje);
      this.alerta = 1;
      setTimeout(() => {
        this.alerta = 0;
      }, 2500)
      this.ingreso_producto = {
        id_producto: 0,
        cantidad: 0,
        fecha_hora: '',
        usuario: localStorage.getItem('id_usuario'),
        tipo_movimiento: 1,
        lote: '',
        fecha_vencimiento: '',
        id_turno: localStorage.getItem('id_turno')
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


salir(){
  this.router.navigate(['/menu']);
}

}
