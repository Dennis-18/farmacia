import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  nombre: string | null = '';
  apellido: string | null = '';
  txt_turno: string = 'Iniciar turno';


  ngOnInit(): void {
    this.datosUsuario();
    
  }

  goServicios(){
    this.router.navigate(['/servicios']);
  }

  goEmpleados(){
    this.router.navigate(['/empleados']);
  }

  goProductos(){
    this.router.navigate(['/productos']);
  }

  ingreso(){
    this.router.navigate(['/ingreso']);
  }

  despacho(){
    this.router.navigate(['/despacho']);
  }

  reportes(){
    this.router.navigate(['/reportes/ingresos']);
  }

  ajustesInventario(){
    this.router.navigate(['/ajustes-inventario']);
  }

  //datos de usuario para navbar
  datosUsuario(){
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  turnos(){
    this.router.navigate(['/turnos']);
  }
}
