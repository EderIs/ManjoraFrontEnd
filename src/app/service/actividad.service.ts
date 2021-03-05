import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Actividad}  from '../models/actividad';

@Injectable({
  providedIn: 'root'
})

export class ActividadService{

    actividadURL = 'http://localhost:8090/actividad/'

constructor(private httpClient : HttpClient){

}

public getActividadByTarea(idTarea : number):Observable<Actividad[]>{
 return this.httpClient.get<Actividad[]>(this.actividadURL+"getActividades/"+idTarea);
}

public saveActividad(actividad : Actividad):Observable<any>{
return this.httpClient.post<any>(this.actividadURL+"create",actividad);
}

public updateActividad(idActividad : number, actividad: Actividad):Observable<any>{
  return this.httpClient.put<any>(this.actividadURL+"updateA/"+idActividad,actividad);
}

public deleteActividad(idActividad : number):Observable<any>{
  return this.httpClient.delete<any>(this.actividadURL+"delete/"+idActividad);
}


}