import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puesto } from '../models/puesto';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  puestoURL = 'http://localhost:8080/puesto/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Puesto[]> {
    return this.HttpClient.get<Puesto[]>(this.puestoURL + 'list');
  }

  public detail(id: number): Observable <Puesto> {
    return this.HttpClient.get<Puesto>(this.puestoURL + `detail/${id}`);
  }

  public detailName(nombrePuesto: string): Observable <Puesto> {
    return this.HttpClient.get<Puesto>(this.puestoURL + `detail/${nombrePuesto}`);
  }

  public save(puesto: Puesto): Observable<any> {
    return this.HttpClient.post<any>(this.puestoURL + 'create', puesto);
  }

  public update(id: number, puesto: Puesto): Observable<any> {
    return this.HttpClient.put<any>(this.puestoURL + `update/${id}`, puesto);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.puestoURL + `delete/${id}`);
  }
}
