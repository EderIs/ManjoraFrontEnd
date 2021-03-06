import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL = 'http://localhost:8090/usuario/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Usuario[]> {
    return this.HttpClient.get<Usuario[]>(this.usuarioURL + 'list');
  }

  public listaByEstado(): Observable <String[]> {
    return this.HttpClient.get<String[]>(this.usuarioURL + 'listByEstado');
  }

  public listUsuarios():Observable<Usuario[]>{
    return this.HttpClient.get<Usuario[]>(this.usuarioURL+"listUser");
  }

  public detail(id: number): Observable <Usuario> {
    return this.HttpClient.get<Usuario>(this.usuarioURL + `detail/${id}`);
  }

  public detailName(nombreUsuario: string): Observable <Usuario> {
    return this.HttpClient.get<Usuario>(this.usuarioURL + `detailname/${nombreUsuario}`);
  }

  public sendEmail(correoE : String):Observable<any>{
  return this.HttpClient.post<any>(this.usuarioURL + `sendEmail`, correoE) 
  }

  public save(usuario: Usuario): Observable<any> {
    return this.HttpClient.post<any>(this.usuarioURL + 'create',usuario);
  }

  public update(id: number, usuario: Usuario): Observable<any> {
    return this.HttpClient.put<any>(this.usuarioURL + `update/${id}`, usuario);
  }
  
  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.usuarioURL + `delete/${id}`);
  }
}
