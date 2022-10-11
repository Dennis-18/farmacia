import { HttpHeaders } from '@angular/common/http';
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


  date: Date = new Date();
  anio = this.date.getFullYear();
  mes = this.date.getMonth() + 1;
  dia = this.date.getDate();


  fecha = this.anio + '-' + this.mes + '-' + this.dia; 


  empleados: Empleados[]=[]; //array vacio 

  public nuevoEmpleado = {
    id: 0,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    dpi: 0,
    renglon: 0,
    telefono: 0,
    correo: '',
    password: '',
    id_tipo_usuario: 0,
  }

  public body= {
    id: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    dpi: '',
    renglon: '',
    telefono: '',
    correo: '',
    password: '',
    id_tipo_usuario: ''
  }

  public nuevoEmpleado2= {
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    dpi: '',
    renglon: '',
    telefono: '',
    correo: '',
    password: '',
    id_tipo_usuario: ''
  }


  public nuevoEmpleadoBusqueda = {
    id: 0,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    dpi: 0,
    renglon: 0,
    telefono: 0,
    correo: '',
    password: '',
    id_tipo_usuario: 0,
  }


  text_btn: string = 'Agregar';

  insertar = true;

  page = 1;

  alerta = 0;
  //alerta == 0 no se muestra ninguna alerta
  //alerta == 1 alerta de proceso exitosa
  //alerta == 2 alerta de proceso fallido

  text_alertas = {
    texto_fuerte: '',
    texto_normal: ''
  }

  public empleados2: empleados[] = []; //puede ser un array vacio

  //voy a llamar a mi servicio para poder hacer push
  constructor(
    private router: Router, 
    private empleadosSvc: PruebasService     //importo el servicio 
  ) { }

  ngOnInit() {
    this.getEmpleados();
    // this.insertEmpleados();
  }

  //todos los empleados
  getEmpleados():void{    

    this.empleadosSvc.getAllEmpleados().subscribe(res =>{
      this.empleados2 = res
    }, error =>{
      console.log(error)
    })


  }

  //insertar un nuevo empleado 

  insertEmpleados(){

    if(this.nuevoEmpleado.nombre == null || this.nuevoEmpleado.apellido == null || this.nuevoEmpleado.correo == null || this.nuevoEmpleado.dpi == null
      || this.nuevoEmpleado.fecha_nacimiento == null || this.nuevoEmpleado.id_tipo_usuario == null || this.nuevoEmpleado.renglon == null || this.nuevoEmpleado.telefono == null){
        
      }else{
        
        this.empleadosSvc.postEmpleados(this.nuevoEmpleado).subscribe(
          (data:any) =>{

            
          }
        )

        this.alerta = 1;
        
        this.text_alertas = {
          texto_fuerte: 'Insercion exitosa',
          texto_normal: ''
        }
        setTimeout(()=>{
          this.alerta = 0;
        }, 2500)
        
        this.text_btn = 'Agregar'

        this.router.navigate(['/empleados'])
        .then(() => {
          window.location.reload();
        });

      }
      
    
  }

  actualizarEmpleado(){

    if(this.nuevoEmpleado.nombre == null || this.nuevoEmpleado.apellido == null || this.nuevoEmpleado.dpi == null || this.nuevoEmpleado.fecha_nacimiento == null ||
      this.nuevoEmpleado.renglon == null || this.nuevoEmpleado.telefono == null || this.nuevoEmpleado.correo == null || this.nuevoEmpleado.password == null){

        console.log("no pueden quedar campos vacios")

      }else{

        
            this.empleadosSvc.updateEmpleados(this.nuevoEmpleado.id, this.nuevoEmpleado).subscribe(
              (data:any) =>{
               
              }
              
              )
              this.alerta = 1;
                
              this.text_alertas = {
                texto_fuerte: 'Modificacion exitosa',
                texto_normal: ''
              }
              setTimeout(()=>{
                this.alerta = 0;
              }, 2500)
              
              this.text_btn = 'Agregar'
        
              this.router.navigate(['/empleados'])
              .then(() => {
                window.location.reload();
              });
      }
  }


  // //en este metodo se va enviar la nueva informacion para actualizar el registro seleccionado
  // updateEmmpleado() {
  //   if (this.nuevoEmpleado.nombre == null || this.nuevoEmpleado.nombre == null) {
  //     //alerta, no se debe dejar vacio el campo
  //   }
  //   else {
  //     try {
  //       this.nuevoEmpleado = {
  //         id: 0,
  //         nombre: '',
  //         apellido: 'Marroquin',
  //         fecha_nacimiento: '1/1/1999',
  //         dpi: 23342342334,
  //         renglon: 23,
  //         telefono: 32345345,
  //         correo: 'dennis@',
  //         password: 'digitador',
  //         id_tipo_usuario: 1,
  //       }
  //       this.alerta = 1;

  //       this.text_alertas = {
  //         texto_fuerte: 'Actualizacion exitosa',
  //         texto_normal: ''
  //       }
  //       setTimeout(() => {
  //         this.alerta = 0;
  //       }, 2500)

  //       this.text_btn = 'Agregar'
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // }

  buscarEmpleados(){
    let busqueda = {
      nombre: this.nuevoEmpleadoBusqueda.nombre
    }
   
    if(this.nuevoEmpleadoBusqueda.nombre == '' || this.nuevoEmpleadoBusqueda.nombre == null){
      
    } else {
      
      this.empleadosSvc.searchByName(busqueda).subscribe((data:any) => {
        if(data.id == 1){
          this.empleados2 = data.mensaje;
 
        }
      })
    }
  }


  eliminar() {
    this.empleadosSvc.updateState(this.nuevoEmpleado.id, this.body).subscribe((data: any) => {
      console.log(data.id);
      if (data.id == 1) {
        this.nuevoEmpleado.id;
        this.alerta = 1;

        this.text_alertas = {
          texto_fuerte: 'Servicio eliminado de la lista',
          texto_normal: ''
        }
        this.getEmpleados();
        setTimeout(() => {
          this.alerta = 0;
        }, 2500)
      }
    })
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
  password: string;
  id_tipo_usuario: number;
}
