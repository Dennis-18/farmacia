import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
//import { Empleados } from 'src/app/empleados/mantenimiento-empleados/mantenimiento-empleados.component';
import { empleados } from '../interfaces/empleados.interface';



@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  url: string = "http://localhost:3000";
  getEmpleados: string = this.url + "/getEmpleados";
  insertEmpleados: string = this.url + "/insertEmpleados";
  upEmpleados: string = this.url + "/updateEmpleadosId/";
  empleadoByName: string = this.url + "/empleadosByName";
  upState: string = this.url + "/updateEmpleadosStatus/";



  token = localStorage.getItem('token') || 'token';
  options = {
    Authorization: this.token
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  //  url: string = ${environment.URL_API}/rlt/empleados;

  getAllEmpleados(): Observable<empleados[]> {
    return this.http.get<empleados[]>(this.getEmpleados, { headers: this.options })
  }

  //insertar empleado
  postEmpleados(cuerpo: any): Observable<empleados> {
    return this.http.post<empleados>(this.insertEmpleados, cuerpo, { headers: this.options })
  }

  //acutalizar empleado
  updateEmpleados(id: any, cuerpo: any): Observable<empleados> {
    return this.http.put<empleados>(this.upEmpleados + id, cuerpo, { headers: this.options })
  }


  searchByName(nombre: any): Observable<empleados[]> {
    return this.http.post<empleados[]>(this.empleadoByName, nombre, { headers: this.options })
  }


  updateState(id: any, cuerpo:any){
    console.log(this.upState + id);
    return this.http.put(this.upState + id, cuerpo, {headers: this.options})
  }


  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {


      console.log("error al hacer la peticion");


    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //   //EJEMPLOOOOS ANDRES 
  //   get(): Observable<Empleados[]> {
  //     return this.http.get<Empleados[]>(this.url).pipe(
  //       catchError(this.handleError));
  //   }

  //   post(hero: Empleados): Observable<Empleados> {
  //     return this.http.post<Empleados>(this.url, hero, this.httpOptions)
  //       .pipe(
  //         catchError(this.handleError)
  //       );
  //   }




}
