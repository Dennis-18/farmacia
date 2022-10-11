import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: ReporteService) { }

  ngOnInit() {
    // console.log('inicia');
    this.despachosUsuario();
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  despachos_usuario: any;
  despachosUsuario(){
    console.log('inicia');
    try{
      this.service.despachosUsuario().subscribe((data:any) => {
        console.log(data);
        if(data.id == 1){
          console.log('hay datos');
          this.despachos_usuario = data.mensaje;
        }
      })
    } catch(error){
      console.log(error);
    }
  }

  detalle_usuario(event: Event){

  }
}
