import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empleados } from 'src/app/shared/interfaces/empleados.interface';
import { PruebasService } from 'src/app/shared/services/pruebas.service';

@Component({
  selector: 'app-mantenimiento-empleados',
  templateUrl: './mantenimiento-empleados.component.html',
  styleUrls: ['./mantenimiento-empleados.component.css']
})
export class MantenimientoEmpleadosComponent {

  titulo: string = 'Empleados'

  empleados: Empleados[] = [
    {
      id: 1,
      nombres: 'Brayan',
      apellidos: 'Cordova',
      fecha_nacimiento: '1/1/1994',
      dpi: 2235643434,
      renglon: 23,
      telefono: 324223433,
      correo: 'brayan@gmail.com',
      puesto: 'digitador',
      id_tipo_usuario: 1,
    },
    {
      id: 2,
      nombres: 'Brayan',
      apellidos: 'Cordova',
      fecha_nacimiento: '1/1/1994',
      dpi: 2235643434,
      renglon: 23,
      telefono: 324223433,
      correo: 'brayan@gmail.com',
      puesto: 'digitador',
      id_tipo_usuario: 2,
    },
    {
    id: 3,
    nombres: 'Dennis',
    apellidos: 'Juarez',
    fecha_nacimiento: '1/1/1994',
    dpi: 2235643434,
    renglon: 23,
    telefono: 324223433,
    correo: 'Dennis@gmail.com',
    puesto: 'comandante',
    id_tipo_usuario: 3,
  }

  ]

  nuevoEmpleado = {
    id: 5,
    nombre: 'Dennis',
    apellido: 'Marroquin',
    fecha_nacimiento: '1/1/1999',
    dpi: 23342342334,
    renglon: 23,
    telefono: 32345345,
    correo: 'dennis@',
    puesto: 'digitador',
    id_tipo_usuario: 3,
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

  empleados2: empleados[] = []; //puede ser un array vacio

  //voy a llamar a mi servicio para poder hacer push
  constructor(
    private router: Router, 
    private empleadosSvc: PruebasService     //importo el servicio 
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados():void{

    this.empleadosSvc.getAllEmpleados().subscribe(res =>{
      this.empleados2 = res
    }, error =>{
      console.log(error)
    })

  }

  //en este metodo se va enviar la nueva informacion para actualizar el registro seleccionado
  updateEmmpleado(){
    if(this.nuevoEmpleado.nombre == '' || this.nuevoEmpleado.nombre == null){
      //alerta, no se debe dejar vacio el campo
    }
    else{
      try{
        this.nuevoEmpleado = {
          id: 0,
          nombre: '',
          apellido: 'Marroquin',
          fecha_nacimiento: '1/1/1999',
          dpi: 23342342334,
          renglon: 23,
          telefono: 32345345,
          correo: 'dennis@',
          puesto: 'digitador',
          id_tipo_usuario: 1,
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


export interface Empleados {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  dpi: number;
  renglon: number;
  telefono: number;
  correo: string;
  puesto: string;
  id_tipo_usuario: number;
}
