import { Component, OnInit } from '@angular/core';
import { service } from '../service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css']
})
export class SaldosComponent implements OnInit {

  constructor(
    private service: service,
  ) { }

  ngOnInit(): void {
    this.id_turno = localStorage.getItem('id_turno')!;
    this.existenciasTurno();
  }

  id_turno: string = localStorage.getItem('id_turno')!; //guarda el valor del id turno
  /*
    en este componente se cargan los saldos de inventario para todos los productos en un turno
  */

  registros:any;

  existenciasTurno(){
    try{
      this.service.existenciasTurno(parseInt(this.id_turno)).subscribe((data:any) =>{
        this.registros = data.mensaje;
      })
    } catch(error){
      console.log(error);
    }
  }

}
