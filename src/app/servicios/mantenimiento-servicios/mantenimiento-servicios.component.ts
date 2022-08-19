import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-servicios',
  templateUrl: './mantenimiento-servicios.component.html',
  styleUrls: ['./mantenimiento-servicios.component.css']
})
export class MantenimientoServiciosComponent implements OnInit {

  titulo: string = 'SERVICIOS'

  servicios: Servicios[] = [
{    id:1,
    descripcion: 'Medicina de Hombres'},
    {
      id: 2,
      descripcion: 'Medicina de Mujeres'
    },
    {
      id: 3,
      descripcion: 'Cirugia de Hombres'
    },
    {
      id: 4,
      descripcion: 'Cirugia de Mujeres'
    },
    {
      id: 5,
      descripcion: 'Cirugia Pedriatria'
    },
    {
      id: 6,
      descripcion: 'Otro servicio'
    }
  ]

  //este array sirve para crear un nuevo objeto que va formar parte de los servicios
  //tambien este objeto sirve para editar los servicios existentes
  nuevoServicio = {
    id: 25,
    descripcion: ''
  }

  text_btn: string = 'Agregar'

  page = 1;

  alerta = 0;
  //alerta == 0 no se muestra ninguna alerta
  //alerta == 1 alerta de proceso exitosa
  //alerta == 2 alerta de proceso fallido

  text_alertas = {
    texto_fuerte: '',
    texto_normal: ''
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }


  //en este metodo se va enviar la nueva informacion para actualizar el registro seleccionado
  updateServicio(){
    if(this.nuevoServicio.descripcion == '' || this.nuevoServicio.descripcion == null){
      //alerta, no se debe dejar vacio el campo
    }
    else{
      try{
        this.nuevoServicio = {
          id: 0,
          descripcion: ''
        }
        this.alerta = 1;
        
        this.text_alertas = {
          texto_fuerte: 'Actualizacion exitosa',
          texto_normal: ''
        }
        setTimeout(()=>{
          this.alerta = 0;
        }, 2500)
        
        this.text_btn = 'Agregar'
      } catch(error){
        console.log(error);
      }
    }

  }

  eliminar(){

  }

  salir(){
    this.router.navigate(['/menu']);
  }

}

interface Servicios {
  id: number;
  descripcion: string;
}