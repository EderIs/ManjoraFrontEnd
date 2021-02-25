import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Banco} from '../models/banco';
import { Calendario } from '../models/calendario';
import { CalendarioBase } from '../models/calendarioBase';

@Injectable({
  providedIn: 'root'
})


export class CalendarioService {

    bancoURL = 'http://localhost:8090/calendario/'

    constructor(private HttpClient: HttpClient) { }
  
    public listaByFecha(fecha:String, fechaF : String, idUser :number):Observable<CalendarioBase[]>{
    return this.HttpClient.get<CalendarioBase[]>(this.bancoURL+`mostrar/${fecha}&${fechaF}&${idUser}`);
    }

    public listaByFechaID(fecha:String, idUser: number):Observable<CalendarioBase[]>{
      return this.HttpClient.get<CalendarioBase[]>(this.bancoURL+`list2/${fecha}&${idUser}`);
      }
  
      public getCalendarioById(id:number):Observable<CalendarioBase>{
        return this.HttpClient.get<CalendarioBase>(this.bancoURL+`getCalendario/${id}`);

      }

    public save(calendario: CalendarioBase): Observable<any> {
      return this.HttpClient.post<any>(this.bancoURL + 'create',calendario);
    }
  
     public update(calendario : CalendarioBase): Observable<any> {
       return this.HttpClient.put<any>(this.bancoURL + `update/${calendario.id}`,calendario);
     }
  
     public delete(id: number): Observable<any> {
       return this.HttpClient.delete<any>(this.bancoURL + `delete/${id}`);
    }

}