import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ReporteService {


    constructor(private httpClient: HttpClient){
        
    }
    private ruta = 'http://192.168.1.105:3000/';
    //variables de rutas
    private url_despachos_usuario = this.ruta + 'despachos_usuarios';

    //buscar cantidad de productos despachados por usuario.
    despachosUsuario(){
       return this.httpClient.get(this.url_despachos_usuario);
    }

}