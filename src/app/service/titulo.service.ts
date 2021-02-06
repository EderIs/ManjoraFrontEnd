import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Titulo} from '../models/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  tituloURL = 'http://localhost:8090/titulo/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Titulo[]> {
    return this.HttpClient.get<Titulo[]>(this.tituloURL + 'list');
  }

  public detail(id: number): Observable <Titulo> {
    return this.HttpClient.get<Titulo>(this.tituloURL + `detail/${id}`);
  }

  public detailName(nombreTitulo: string): Observable <Titulo> {
    return this.HttpClient.get<Titulo>(this.tituloURL + `detail/${nombreTitulo}`);
  }

  public save(titulo: Titulo): Observable<any> {
    return this.HttpClient.post<any>(this.tituloURL + 'create', titulo);
  }

  public update(id: number, titulo: Titulo): Observable<any> {
    return this.HttpClient.put<any>(this.tituloURL + `update/${id}`, titulo);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.tituloURL + `delete/${id}`);
  }

  public listaByTitulo(titulo:string):Observable<Titulo[]>{
    return this.HttpClient.get<Titulo[]>(this.tituloURL+`list/${titulo}`);
  }
}
