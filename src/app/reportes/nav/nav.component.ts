import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goDashBoard(){
    this.router.navigate(['reportes/dashboard']);
  }

  goMetricas(){
    this.router.navigate(['reportes/metricas']);
  }

  goExistencias(){
    this.router.navigate(['reportes/existencias']);
  }

  goDespachos(){
    this.router.navigate(['reportes/r-despachos']);
  }

}
