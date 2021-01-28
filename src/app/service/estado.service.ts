import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  estadoURL = 'http://localhost:8090/estado/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Estado[]> {
    return this.HttpClient.get<Estado[]>(this.estadoURL + 'list');
  }

  public listaByNombre(nombreEstado:string):Observable<Estado[]>{
    return this.HttpClient.get<Estado[]>(this.estadoURL+`list/${nombreEstado}`);
    }

  public detail(id: number): Observable <Estado> {
    return this.HttpClient.get<Estado>(this.estadoURL + `detail/${id}`);
  }

  public detailName(nombreEstado: string): Observable <Estado> {
    return this.HttpClient.get<Estado>(this.estadoURL + `detailname/${nombreEstado}`);
  }

  public save(estado: Estado): Observable<any> {
    return this.HttpClient.post<any>(this.estadoURL + 'create', estado);
  }

  public update(id: number, estado: Estado): Observable<any> {
    return this.HttpClient.put<any>(this.estadoURL + `update/${id}`, estado);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.estadoURL + `delete/${id}`);
  }
}
