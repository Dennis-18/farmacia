import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from './service';
import { NgxIzitoastService } from 'ngx-izitoast';
@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  myDate: any = new Date();
  constructor(
    private router: Router,
    private service: service,
    private iziToast: NgxIzitoastService,

  ) { }

/*
funcion de verificar si hay turnos pendientes de cerrar esta lista
crear un flujo para que se pueda iniciar un turno solo si no existen turnos pendientes de cerrar
una vez cerrado un turno, que aparezcan los controles para iniciar un nuevo turno
tiene que existir un solo turno activo a la vez

*/


  ngOnInit() {
    this.verificarTurnos();
    this.fecha_hora = this.fecha();
    this.id_usuario = localStorage.getItem('id_usuario')!;
    this.nombre = localStorage.getItem('nombre')!;
    this.apellido = localStorage.getItem('apellido')!;
    this.historialTurnos();
    
  }

  id_usuario: string = localStorage.getItem('id_usuario')!;
  turnos = [
    {id_turno: 0, fecha_inicio: '-', fecha_final: '-', notas:'-'}
  ];

  nombre: string = '';
  apellido: string = '';
  fecha_hora: string = '';
  //si existe un movimiento esta variable se setea con valor true
  //eso hace que se muestre la tabla "tablaMovimientos"
  //esta variable se setea en el metodo Verficiar turnos
  existeMovimiento: boolean = true;
  
  //guarda los datos de creacion de un turno
  turno = {
    id_turno: '',
    fecha_inicio: this.fecha(),
    id_usuario: this.id_usuario,
    notas: '',
    fecha_final:''
  };

  movimientos: any;

 


//fecha y hora actual
fecha(){

  let date: Date = new Date();
 let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  // this.fecha_hora=year+'-'+month+'-'+day+' ' + hour + ':'+minute +':'+seconds;
  return year+'-'+month+'-'+day+' ' + hour + ':'+minute +':'+seconds;
}

  detallesTurno(id_turno: string | number){
    try{
          this.router.navigate(['/turno/' + id_turno]);
     
    } catch(error){
      console.log(error);
    }
  }

  //crear un nuevo turno
   nuevoTurno(){
    //  this.verificarTurnos();
    // console.log('inicia nuevoTurno')
    // console.log(this.turno);
    // console.log(!this.existeMovimiento);
    if(!this.existeMovimiento){
      //creamos un nuevo turno
      // console.log('entra if');
      this.service.nuevoTurno(this.turno).subscribe((data:any) => {
        console.log(data);
        if(data.id == 1){
            this.exito('Turno iniciado');
            console.log('id turno: ' + data.mensaje);
            localStorage.setItem('id_turno', data.mensaje)
            this.existeMovimiento = true;
            this.service.copiarExistencias(parseInt(this.id_usuario), data.mensaje, this.fecha()).subscribe((data:any) => {
              console.log(`Respuesta copiar existencias: ${data.mensaje}`);
            })
        } else{
          console.log(data);
        }
      })

    }
  }

  //finalizar un turno
  finalizarTurno(){
    this.turno.fecha_final = this.fecha();
    this.service.finalizarTurno(this.turno).subscribe((data:any) => {
      if(data.id == 1){
        this.turno = {
          id_turno: '',
          fecha_inicio: this.fecha(),
          id_usuario: this.id_usuario,
          notas: '',
          fecha_final:''
          
        };
        localStorage.removeItem('id_turno');
        // this.existeMovimiento = false;
        this.verificarTurnos();
        this.historialTurnos();
        this.exito('Turno finalizado');

      } else{
        this.fallido('Error. Intentelo de nuevo');
      }
    })
  }


  //verificar si existen turnos pendientes
  //se envia el id de usuario para verificar los turnos
  verificarTurnos(){
    this.service.verificarTurnos(this.id_usuario).subscribe((data:any) => {
      // console.log(data);
      if(data.id == 3){
        console.log('no hay turnos sin cerrar');
        this.existeMovimiento = false;
      }
      if(data.id == 2){
        localStorage.clear();
        this.router.navigate(['login']);
      }
      if(data.id == 1){
        this.existeMovimiento = true;
        console.log(data);
        this.turno.fecha_inicio = data.mensaje[0].fecha_inicio;
        this.turno.notas = data.mensaje[0].notas;
        this.turno.id_turno = data.mensaje[0].id_turno;
        localStorage.setItem('id_turno',data.mensaje[0].id_turno);
        this.historialMovimientos();
      }
    });

  }

  //obtiene el listado de turnos que tiene el usuario
   historialTurnos(){
     this.service.historialTurnos(this.turno.id_usuario!).subscribe((data:any) =>{
        if(data.id == 1){
          this.turnos = data.mensaje
        }
    })
  } 

  //obtiene los movimientos que tiene el turno actual
   historialMovimientos(){
    console.log(this.turno.id_turno);
    try{
      this.service.historialMovimientos(this.turno.id_usuario!, this.turno.id_turno!).subscribe((data:any) => {
          if(data.id == 1){
            this.movimientos = data.mensaje;
          } else{
            console.log(data);
          }
      })
    } catch(error){
      console.log(error);
    }
  }

  fallido(texto:string){
    this.iziToast.show({
      title: texto,
      class: "foo",
      progressBarColor: "red",
      timeout: 2500,
      onClosed: () => {
        console.log("closed");
      }
    })
  }

  exito(texto:string){
    this.iziToast.show({
      title: texto,
      class: "foo",
      progressBarColor: "green",
      timeout: 2500,
      onClosed: () => {
        console.log("closed");
      }
    })
  }

  salir(){
    this.router.navigate(['/menu']);
  }
}


