import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  paisURL = 'http://localhost:8090/pais/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Pais[]> {
    return this.HttpClient.get<Pais[]>(this.paisURL + 'list');
  }

  public detail(id: string): Observable <Pais> {
    return this.HttpClient.get<Pais>(this.paisURL + `detail/${id}`);
  }

  public detailName(nombrePais: string): Observable <Pais> {
    return this.HttpClient.get<Pais>(this.paisURL + `detail/${nombrePais}`);
  }

  public save(pais: Pais): Observable<any> {
    return this.HttpClient.post<any>(this.paisURL + 'create', pais);
  }

  public update(id: number, pais: Pais): Observable<any> {
    return this.HttpClient.put<any>(this.paisURL + `update/${id}`, pais);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.paisURL + `delete/${id}`);
  }

  public listaByNombre(nombrePais:string):Observable<Pais[]>{
    return this.HttpClient.get<Pais[]>(this.paisURL+`list/${nombrePais}`);
  }
}
