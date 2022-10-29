import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ReporteService {


    constructor(private httpClient: HttpClient){
        
    }
    private ruta = 'http://localhost:3000/';
    //variables de rutas
    private url_despachos_usuario = this.ruta + 'despachos_usuarios';
    private url_consumo_servicios = this.ruta + 'consumo_servicios';
    private url_valorizado = this.ruta + 'valorizado';
    private url_existencia = this.ruta + 'existenciasInventario';
    private url_historial_despachos = this.ruta + 'historialDespachos';
    private url_ingresos_inventario = this.ruta + 'ingresosInventario';

    //token
    token = localStorage.getItem('token') || 'token';
    options = {
        Authorization: this.token
    }

    //buscar cantidad de productos despachados por usuario.
    despachosUsuario(){
       return this.httpClient.get(this.url_despachos_usuario);
    }

    consumoServicios(){
        return this.httpClient.get(this.url_consumo_servicios);
    }

    valorizado(){
        return this.httpClient.get(this.url_valorizado);
    }

    existencias(){
        return this.httpClient.get(this.url_existencia);
    }

    historialDespachos(){
        return this.httpClient.get(this.url_historial_despachos);
    }

    historialIngresos(){
        return this.httpClient.get(this.url_ingresos_inventario, {headers: this.options});
    }

    historialAjustes(){

    }

}