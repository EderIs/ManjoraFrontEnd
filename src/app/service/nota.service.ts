import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Nota}   from '../models/nota';

@Injectable({
  providedIn: 'root'
})

export class NotaService{

    notaURL = 'http://localhost:8090/nota/'

constructor(private httpClient : HttpClient){

}

public getNotasByCategoria(idNota : number):Observable<Nota[]>{

  return this.httpClient.get<Nota[]>(this.notaURL+"getNotas/"+idNota);
}

public getNotasByIdNota(idNota : number):Observable<Nota>{

  return this.httpClient.get<Nota>(this.notaURL+"getNota/"+idNota);
}

public updateNotaByCategoria(idNota  : number, nota : Nota):Observable<any>{

  return this.httpClient.put<any>(this.notaURL+"updateNota/"+idNota,nota);
}

public updateNota(idNota : number , nota: Nota):Observable<any>{

  return this.httpClient.put<any>(this.notaURL+"updateNotaA/"+idNota,nota);
}

public createNota(nota: Nota):Observable<any>{

  return this.httpClient.post<any>(this.notaURL+'createNota',nota);
}

public delete(id: number): Observable<any> {
  return this.httpClient.delete<any>(this.notaURL + `delete/${id}`);
}

}