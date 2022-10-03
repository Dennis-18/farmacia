import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { productos } from '../interfaces/productos.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  url: string = "http://localhost:3000";
  getProductos: string = this.url + "/productos";
  postProductos: string = this.url + "/new_productos";
  putProductos: string = this.url + "/update_productos/";
  getNameProductos: string = this.url + "/productosByName";
  updateState: string = this.url + "/updateState/";

  token = localStorage.getItem('token') || 'token';
  options = {
    Authorization: this.token
  }

  getProducts(): Observable<productos[]>{
    return this.http.get<productos[]>(this.getProductos, {headers : this.options})
  }

  postProducts(cuerpo:any): Observable<productos[]>{
    return this.http.post<productos[]>(this.postProductos, cuerpo, {headers : this.options})
  }

  updateProducts(id:any, cuerpo:any): Observable<productos>{
    return this.http.put<productos>(this.putProductos + id, cuerpo, {headers : this.options})
  }

  searchByName(descripcion:any): Observable<productos[]>{
    return this.http.post<productos[]>(this.getNameProductos, descripcion, {headers : this.options})
  }

  upState(id: any, cuerpo: any){
    return this.http.put(this.updateState + id, cuerpo, {headers : this.options})
  }

}
