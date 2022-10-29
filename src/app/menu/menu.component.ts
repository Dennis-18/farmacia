import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
    this.router.navigate(['/reportes/dashboard']);
  }

  ajustesInventario(){
    this.router.navigate(['/ajustes-inventario']);
  }
}
