import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tarea}   from '../models/tarea';

@Injectable({
  providedIn: 'root'
})

export class TareaService{

    tareaURL = 'http://localhost:8090/tarea/'

constructor(private httpClient : HttpClient){

}

public getTareasByEtapa(idEtapa : number):Observable<Tarea[]>{

  return this.httpClient.get<Tarea[]>(this.tareaURL+"getTareas/"+idEtapa);
}

public getTareasByIdTarea(idTarea : number):Observable<Tarea>{

  return this.httpClient.get<Tarea>(this.tareaURL+"getTarea/"+idTarea);
}

public updateTareaByEtapa(idTarea  : number, tarea : Tarea):Observable<any>{

  return this.httpClient.put<any>(this.tareaURL+"updateTarea/"+idTarea,tarea);
}

public updateTarea(idTarea : number , tarea: Tarea):Observable<any>{

  return this.httpClient.put<any>(this.tareaURL+"updateTareaA/"+idTarea,tarea);
}

}