import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from '../api-service';

@Component({
  selector: 'app-mantenimiento-servicios',
  templateUrl: './mantenimiento-servicios.component.html',
  styleUrls: ['./mantenimiento-servicios.component.css']
})
export class MantenimientoServiciosComponent implements OnInit {

  date: Date = new Date();
  anio = this.date.getFullYear();
  mes = this.date.getMonth() + 1;
  dia = this.date.getDate();


  fecha = this.anio + '-' + this.mes + '-' + this.dia; 
  titulo: string = 'SERVICIOS'

  // servicios: Servicios[] = [
  //   {
  //     id: 1,
  //     descripcion: 'Medicina de Hombres'
  //   },
  //   {
  //     id: 2,
  //     descripcion: 'Medicina de Mujeres'
  //   },
  //   {
  //     id: 3,
  //     descripcion: 'Cirugia de Hombres'
  //   },
  //   {
  //     id: 4,
  //     descripcion: 'Cirugia de Mujeres'
  //   },
  //   {
  //     id: 5,
  //     descripcion: 'Cirugia Pedriatria'
  //   },
  //   {
  //     id: 6,
  //     descripcion: 'Otro servicio'
  //   }
  // ]

  servicios: any = []

  //este array sirve para crear un nuevo objeto que va formar parte de los servicios
  //tambien este objeto sirve para editar los servicios existentes
  nuevoServicio = {
    descripcion: '',
    fecha_registro: this.fecha
  }
  text_btn: string = 'Agregar'
  page = 1;
  alerta = 0;
  //alerta == 0 no se muestra ninguna alerta
  //alerta == 1 alerta de proceso exitosa
  //alerta == 2 alerta de proceso fallido

  insertar = true;


  body = {
    id_servicio: '',
    descripcion: ''
  }
  text_alertas = {
    texto_fuerte: '',
    texto_normal: ''
  }
  constructor(private router: Router, private apiService: apiService) { }

  ngOnInit() {
    this.cargarServicios();

  }


  //en este metodo se va enviar la nueva informacion para actualizar el registro seleccionado
  updateServicio() {
    if (this.nuevoServicio.descripcion == '' || this.nuevoServicio.descripcion == null) {

      //alerta, no se debe dejar vacio el campo
    }
    else {
      try {

        // console.log(this.body);
        

          //update
          this.apiService.updateService(this.body).subscribe((data: any) =>{
            if(data.id == 1){

              //resultado exitoso
              this.insertar = true;
              this.nuevoServicio = {
                
                descripcion: '',
                fecha_registro: ''
              }
              this.alerta = 1;
      
              this.text_alertas = {
                texto_fuerte: 'Actualizacion exitosa',
                texto_normal: ''
              }
              this.cargarServicios();
              setTimeout(() => {
                this.alerta = 0;
              }, 2500)
      
              this.text_btn = 'Agregar'

            } else if(data.id == 2 || data.id == 3){
              this.router.navigate(['/login']);
            }

            else if(data.id == 0) {
              this.alerta = 2;
      
              this.text_alertas = {
                texto_fuerte: 'Ha ocurrido un error',
                texto_normal: ' Intentelo de nuevo'
              }
              this.cargarServicios();
              setTimeout(() => {
                this.alerta = 0;
              }, 2500)
            }

          })

        

      } catch (error) {
        console.log(error);
      }
    }

  }

  eliminar() {

  }

  salir() {
    this.router.navigate(['/menu']);
  }

  cargarServicios() {
    this.apiService.services().subscribe((data: any) => {
      // console.log(data.id);
      if (data.id == 1) {
        // console.log(data.mensaje);
        this.servicios = data.mensaje;
      } else if(data.id == 2){
        this.router.navigate(['/login']);
      }
      
    })
  }

  //agrega un nuevo servicio a la bd
  agregarServicio(){
    
      this.apiService.addService(this.nuevoServicio).subscribe((data:any) =>{
        console.log(data.id);
        if(data.id == 1){
          this.nuevoServicio = {
            
            descripcion: '',
            fecha_registro: ''
          }
          this.alerta = 1;
  
          this.text_alertas = {
            texto_fuerte: 'Servicio agregado',
            texto_normal: ''
          }
          setTimeout(() => {
            this.alerta = 0;
          }, 2500)
  
          this.cargarServicios();
        } else if(data.id == 0){
          this.alerta = 2;
          this.text_alertas = {
            texto_fuerte: 'Ocurrio un error',
            texto_normal: ' Intentalo de nuevo'
          }
          setTimeout(() => {
            this.alerta = 0;
          }, 2500)
        } else if(data.id == 2 || data.id == 3){
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      })

    
    
  }

  buscarPorNombre(){
    let busqueda = {
      servicio: this.nuevoServicio.descripcion
    }
    if(this.nuevoServicio.descripcion == '' || this.nuevoServicio.descripcion == null){

    } else {
      
      this.apiService.searchByName(busqueda).subscribe((data:any) => {
        if(data.id == 1){
          this.servicios = data.mensaje;
        }
      })
    }
  }

  cambiarEstado(){
    this.apiService.updateEstado(this.body).subscribe((data: any) =>{
      console.log(data.id);
      if(data.id == 1){
        this.nuevoServicio = {
                
          descripcion: '',
          fecha_registro: ''
        }
        this.alerta = 1;

        this.text_alertas = {
          texto_fuerte: 'Servicio eliminado de la lista',
          texto_normal: ''
        }
        this.cargarServicios();
        setTimeout(() => {
          this.alerta = 0;
        }, 2500)
      }
    })
  }

}

interface Servicios {
  id: number;
  descripcion: string;
}