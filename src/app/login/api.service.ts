import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class apiService {

    constructor(private httpClient: HttpClient) {}

    url = 'http://localhost:3000';
    login =this.url + '/auth';


    
    auth(body:any){
        return this.httpClient.post(this.login, body);
    }

}