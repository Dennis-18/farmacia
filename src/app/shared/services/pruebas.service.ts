import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Empleados } from 'src/app/empleados/mantenimiento-empleados/mantenimiento-empleados.component';



@Injectable({
  providedIn: 'root'
})
export class PruebasService {


  //  url: string = ${environment.URL_API}/rlt/empleados;
  url: string = "EstoEsUnaPrueba/rlt/empleados";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  get(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(this.url).pipe(
      catchError(this.handleError));
  }

  post(hero: Empleados): Observable<Empleados> {
    return this.http.post<Empleados>(this.url, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }




}
