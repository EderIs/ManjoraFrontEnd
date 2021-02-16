import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Puesto } from '../models/puesto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class PuestoService {

  private mPuestos = new  BehaviorSubject<Puesto[]>([])
  puestoURL = 'http://localhost:8090/puesto/'

  get Puestos(): Observable<Puesto[]>{
    return this.mPuestos.asObservable()
  }

  constructor(private HttpClient: HttpClient) { }

  
fetchPuestos(): Observable<any>{
  return this.HttpClient.get<Puesto[]>(this.puestoURL + 'list')
  .pipe(
    tap(puestos => {
      this.mPuestos.next(puestos); 
    })
  )
}


  /* public lista(): Observable <Puesto[]> {
    return this.HttpClient.get<Puesto[]>(this.puestoURL + 'list');
  }  */
 
 
  public listaByNombre(nombre:string):Observable<Puesto[]>{
    return this.HttpClient.get<Puesto[]>(this.puestoURL+`list/${nombre}`);
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

  public delete(id: number): Observable<Puesto> {
    return this.HttpClient.delete<Puesto>(`${this.puestoURL}${id}`);
  }
}
