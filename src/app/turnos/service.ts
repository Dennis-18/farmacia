import { ApiRoute } from "../api-route";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class service {
    constructor(
        private apiRoute: ApiRoute,
        private httpClient: HttpClient
        ){

    }
    token = localStorage.getItem('token') || 'token';
    options = {
        Authorization: this.token
    }

    direccion: string = this.apiRoute.rutaApi();
    url_vericarTurnos = this.direccion + 'estado/';
    url_nuevoTurno = this.direccion + 'nuevoTurno';
    url_finalizarTurno = this.direccion + 'finalizarTurno';
    url_historialTurnos = this.direccion + 'historialTurnos/';
    url_detallesTurno = this.direccion + 'detallesTurno/';
    url_existenciasTurno = this.direccion + 'consultarExistenciasTurno';
    url_copiarExistencias = this.direccion + 'copiarExistenciasTurno';
    verificarTurnos(usuario: string | null){
        return this.httpClient.get(this.url_vericarTurnos + usuario, {headers: this.options})
    }

    nuevoTurno(body: any){
        return this.httpClient.post(this.url_nuevoTurno, body, {headers: this.options})
    }

    finalizarTurno(body:any) {
        return this.httpClient.post(this.url_finalizarTurno, body, {headers: this.options});
    }

    historialTurnos(id_usuario:string){
        return this.httpClient.get(this.url_historialTurnos + id_usuario, {headers: this.options});
    }

    historialMovimientos(id_usuario: string, id_turno: string | number){
        // /historialMovimientos/:id_usuario/:id_turno
   
        return this.httpClient.get(`${this.direccion}historialMovimientos/${id_usuario}/${id_turno}`, {headers: this.options});
    }

    detallesTurno(id_turno: string){
        return this.httpClient.get(this.url_detallesTurno + id_turno, {headers: this.options});
    }

    existenciasTurno(id_turno: number){
        return this.httpClient.get(this.url_existenciasTurno+`?id_turno=${id_turno}`);
    }

    copiarExistencias(id_usuario: number, id_turno: number, fecha_hora: string){
        return this.httpClient.get(this.url_copiarExistencias + `?id_usuario=${id_usuario}&id_turno=${id_turno}&fecha_hora=${fecha_hora}`);
    }
}