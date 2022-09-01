import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from './api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: apiService) { }

  ngOnInit(): void {
  }
  credenciales = {
    user: '',
    pass: ''
  }
  usuario = {
    nombre: '',
    apellido: '',
    id_usuario: ''
  };

  alerta = '';
  mostrar_alerta = false;

  iniciar(){
    if(this.credenciales.user !== '' && this.credenciales.pass !== ''){
      try{
  
        this.api.auth(this.credenciales).subscribe((data:any) =>{
          if(data.id === 1){
            //guardar token en local storage
            this.usuario = data.datos[0];
            console.log(this.usuario);
            localStorage.setItem('nombre', this.usuario.nombre);
            localStorage.setItem('apellido',this.usuario.apellido);
            localStorage.setItem('id_usuario', this.usuario.id_usuario);
            localStorage.setItem('token', data.token);
            // console.log('user ' + localStorage.getItem('usuario'));
            // console.log('apellido ' + localStorage.getItem('apellido'));
            // console.log('id_usuario ' + localStorage.getItem('id_usuario'));
            // console.log('token ' + localStorage.getItem('token'));
            this.router.navigate(['/menu']);
          }  else if(data.id === 0){
  
            this.alerta = data.mensaje;
  
          }
        });
      } catch(err){
  
      }

    } else{
      this.alerta = 'Complete los campos';
      this.mostrar_alerta = true;
    }
  }
}
