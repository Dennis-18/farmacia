import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class apiService {
    constructor(private httpClient: HttpClient){}

    url = 'http://localhost:3000';
    allServices = this.url + '/servicios';
    newService = this.url + '/newService';
    modificarServicio = this.url + '/updateService';
    nombreServicio = this.url + '/serviceByName';
    estado = this.url + '/updateState';

    url_productos = this.url + '/productos';
    url_inventario = this.url + '/inventario';
    url_lotes = this.url + '/lotes/';
    url_validar_despacho = this.url + '/validar_despacho';
    

    
    token = localStorage.getItem('token') || 'token';
    options = {
        Authorization: this.token
    }

    validarDespacho(body:any){
        return this.httpClient.post(this.url_validar_despacho, body, {headers: this.options})
    }

    lotes(id_producto: number){
        return this.httpClient.get(this.url_lotes+ id_producto, {headers: this.options})
    }

    productos(){
        return this.httpClient.get(this.url_productos, {headers: this.options});
    }

    inventario(body: any){
        return this.httpClient.post(this.url_inventario, body, {headers: this.options})
    }


    services(){
        // return this.httpClient.get(this.allServices, {headers: this.options});
        // console.log(this.options);
        return this.httpClient.get(this.allServices, {headers: this.options});
    }

    addService(body: any){
        return this.httpClient.post(this.newService, body, {headers: this.options})
    }

    updateService(body: any){
        return this.httpClient.post(this.modificarServicio, body, {headers: this.options});
    }

    searchByName(body: any){
        return this.httpClient.post(this.nombreServicio, body, {headers: this.options});
    }

    updateEstado(body: any) {
        
        return this.httpClient.post(this.estado, body , {headers: this.options});
    }



}
