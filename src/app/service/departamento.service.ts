import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
    departamentoURL = 'http://localhost:8090/departamento/'
  
    constructor(private HttpClient: HttpClient) { }
  
    public lista(): Observable <Departamento[]> {
      return this.HttpClient.get<Departamento[]>(this.departamentoURL + 'list');
    }
    public listaByNombre(nombre:string):Observable<Departamento[]>{
      return this.HttpClient.get<Departamento[]>(this.departamentoURL+`list/${nombre}`);
      }
    public detail(id: number): Observable <Departamento> {
      return this.HttpClient.get<Departamento>(this.departamentoURL + `detail/${id}`);
    }
  
    public detailName(nombreDepartamento: string): Observable <Departamento> {
      return this.HttpClient.get<Departamento>(this.departamentoURL + `detail/${nombreDepartamento}`);
    }
  
    public save(departamento: Departamento): Observable<any> {
      return this.HttpClient.post<any>(this.departamentoURL + 'create', departamento);
    }
  
    public update(id: number, departamento: Departamento): Observable<any> {
      return this.HttpClient.put<any>(this.departamentoURL + `update/${id}`, departamento);
    }
  
    public delete(id: number): Observable<any> {
      return this.HttpClient.delete<any>(this.departamentoURL + `delete/${id}`);
    }
}
