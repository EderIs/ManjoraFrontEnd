import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../models/jwt';
import { LoginUsuario } from '../models/loginUsuario';
import { NuevoUsuario } from '../models/NuevoUsuario';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})

export class AuthService {


    authURL = "http://localhost:8090/auth/";


    constructor(private httpClient: HttpClient) {

    }

    public newUser(nuevoUsuario: NuevoUsuario): Observable<any> {
        return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
    }

    public login(loginUsuario: LoginUsuario): Observable<Jwt> {
        return this.httpClient.post<Jwt>(this.authURL + 'login', loginUsuario);
    }

    public detail(id: number): Observable <Usuario> {
        return this.httpClient.get<Usuario>(this.authURL + `detail/${id}`);
      }

      public register(id: number, usuario: Usuario): Observable<any> {
        return this.httpClient.put<any>(this.authURL + `ingresoUsuario/${id}`, usuario);
      }
}