import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { service } from '../turnos/service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: service
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['turno']);
    
    this.id_turno = this.activatedRoute.snapshot.params['turno'];

    this.historialMovimientos();
    this.detallesTurno();
  }

  movimientos: any;
  id_usuario = localStorage.getItem('id_usuario');
  id_turno = '';
  turno: any;
  historialMovimientos(){
    this.service.historialMovimientos(this.id_usuario!, this.id_turno ).subscribe((data:any) => {
      // console.log(data);
      if(data.id == 1) {
        this.movimientos = data.mensaje;
      }
    })
  }

  //obtener los detalles de un turno con su id
  detallesTurno(){
    this.service.detallesTurno(this.id_turno).subscribe((data:any) =>{
      if(data.id == 1) {
          // console.log(data.mensaje);

          this.turno = data.mensaje;
          console.log(this.turno);
      }
    })
  }
    //guarda los registros de la tabla en un archivo de excel
    exportData(){
      try{
    
        let elemento = document.getElementById('movimientos');
        if(elemento){
          console.log('existe tabla html')
        }
        const worksheet: xlsx.WorkSheet = xlsx.utils.table_to_sheet(elemento);
    
        const book: xlsx.WorkBook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book, worksheet, 'Sheet1');
    
        xlsx.writeFile(book, 'Inventario.xlsx');
      } catch(error){
        console.log('error exportar archivo: ' + error);
      }
    }

    salir(){
      this.router.navigate(['/turnos']);
    }
}
