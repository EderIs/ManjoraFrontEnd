import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  contactoURL = 'http://localhost:8090/contacto/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Contacto[]> {
    return this.HttpClient.get<Contacto[]>(this.contactoURL + 'list');
  }
  public listaByNombre(nombre:string):Observable<Contacto[]>{
    return this.HttpClient.get<Contacto[]>(this.contactoURL+`list/${nombre}`);
    }

  public detail(id: number): Observable <Contacto> {
    return this.HttpClient.get<Contacto>(this.contactoURL + `detail/${id}`);
  }

  public detailName(nombreContacto: string): Observable <Contacto> {
    return this.HttpClient.get<Contacto>(this.contactoURL + `detail/${nombreContacto}`);
  }

  public save(contacto: Contacto): Observable<any> {
    return this.HttpClient.post<any>(this.contactoURL + 'create', contacto);
  }

  public update(id: number, contacto: Contacto): Observable<any> {
    return this.HttpClient.put<any>(this.contactoURL + `update/${id}`, contacto);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.contactoURL + `delete/${id}`);
  }
}
