import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empleados } from 'src/app/shared/interfaces/empleados.interface';
import { productos } from 'src/app/shared/interfaces/productos.interface';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { PruebasService } from 'src/app/shared/services/pruebas.service';

@Component({
  selector: 'app-mantenimiento-productos',
  templateUrl: './mantenimiento-productos.component.html',
  styleUrls: ['./mantenimiento-productos.component.css']
})
export class MantenimientoProductosComponent  {

  titulo: string = 'Productos'

  // id_usuario = localStorage.getItem('id_usuario')
 idUs = localStorage.getItem('id_usuario') || 'id_usuario';

  date: Date = new Date();
  anio = this.date.getFullYear();
  mes = this.date.getMonth() + 1;
  dia = this.date.getDate();


  fecha = this.anio + '-' + this.mes + '-' + this.dia; 


  productos: Productos [] = [];

  public nuevoProducto = {
    id: 0,
    descripcion : '',
    precio_unitario: '',
    fecha: '',
    stock_min: 2
  }

  public nuevoProductoBusqueda = {
    id: 0,
    descripcion : '',
    precio_unitario: '',
    fecha: ''
  }


  public body= {
    id: 0,
    descripcion : '',
    precio_unitario: '',
    fecha: ''
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
  public productos2: productos[] = [];

  //voy a llamar a mi servicio para poder hacer push
  constructor(
    private router: Router, 
    private empleadosSvc: PruebasService, //importo el servicio 
    private productosSvc: ProductosService
    ) { }

  ngOnInit() {
    this.getEmpleados();
    this.getProductos();
  }

  //todos los empleados
  getEmpleados():void{    

    this.empleadosSvc.getAllEmpleados().subscribe(res =>{
      this.empleados2 = res
    }, error =>{
      console.log(error)
    })


  }

  getProductos():void{
    this.productosSvc.getProducts().subscribe(res =>{
     this.productos2 = res;
  
    }, error =>{
      console.log(error)
    })
  }


  insertProductos(){

    if(this.nuevoProducto.stock_min >=2){

      if(this.nuevoProducto.descripcion == null || this.nuevoProducto.precio_unitario == null){
          
        }else{
          
          
          this.productosSvc.postProducts(this.nuevoProducto).subscribe(
            (data:any) =>{
              console.log(data);
              
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
  
          this.router.navigate(['/productos'])
          .then(() => {
            window.location.reload();
          });
  
        }
    }
    else{
      this.alerta = 2;
          
          this.text_alertas = {
            texto_fuerte: 'Debe ingresar al menos dos ',
            texto_normal: ''
          }
          setTimeout(()=>{
            this.alerta = 0;
          }, 6500)
          
          this.text_btn = 'Agregar'
  
          this.router.navigate(['/productos'])
          .then(() => {
            window.location.reload();
          });
    }

      
    
  }

  actualizarProducto(){

    if(this.nuevoProducto.descripcion == null || this.nuevoProducto.precio_unitario == null){

        console.log("no pueden quedar campos vacios")

      }else{

        
            this.productosSvc.updateProducts(this.nuevoProducto.id, this.nuevoProducto).subscribe(
              (data:any) =>{
               console.log(data)
              }
              
              )
              this.alerta = 2;
                
              this.text_alertas = {
                texto_fuerte: 'Ingrese al menos 2',
                texto_normal: ''
              }
              setTimeout(()=>{
                this.alerta = 0;
              }, 6500)
              
              this.text_btn = 'Agregar'
        
              this.router.navigate(['/productos'])
              .then(() => {
                window.location.reload();
              });
      }
  }

  buscarProductos(){
    let busqueda = {
      descripcion: this.nuevoProductoBusqueda.descripcion
    }
   
    if(this.nuevoProductoBusqueda.descripcion == '' || this.nuevoProductoBusqueda.descripcion == null){
      
    } else {
     // console.log(busqueda);
      this.productosSvc.searchByName(busqueda).subscribe((data:any) => {
        if(data.id == 1){
          this.productos2 = data.mensaje;
       //   console.log(this.productos2)
        }
      })
    }
  }


  eliminar() {
    this.productosSvc.upState(this.nuevoProducto.id, this.body).subscribe((data: any) => {
      console.log(data.id);
      if (data.id == 1) {
        this.nuevoProducto.id;
        this.alerta = 1;

        this.text_alertas = {
          texto_fuerte: 'Servicio eliminado de la lista',
          texto_normal: ''
        }
        this.getProductos();
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



export interface Productos {
  id: number;
  descripcion: string;
  precio: string;
}

